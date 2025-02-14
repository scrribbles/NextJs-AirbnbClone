from rest_framework.generics import ListAPIView, RetrieveAPIView, \
	RetrieveUpdateDestroyAPIView, get_object_or_404, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Properties
from .serializers import PropertiesListSerializer, PropertyDetailSerializer, CreatePropertySerializer

from services.cache_wrapper import CacheWrapper


cache = CacheWrapper()


class CreatePropertyView(CreateAPIView):
    """ class to create a property """
    queryset = Properties.objects.all()
    serializer_class = CreatePropertySerializer
    permission_classes = [IsAuthenticated]

    # def create(self, request, *args, **kwargs):
    #     return super().create(request, *args, **kwargs)


class GetAllProperties(ListAPIView):
	""" class to get the list of properties - homepage"""
	queryset = Properties.objects.all()

	serializer_class = PropertiesListSerializer

	def list(self, request, *args, **kwargs) -> Response:
		""" list/get request to get all properties """
		params = request.query_params.get('category', "")
		print(request.query_params)
		page = request.query_params.get('page', 1)
		key = f"{params}_{page}_{request.user}"
		data = ""
		# if params is None:
		# 	return Response({'data': 'Please provide a param to search '
		# 							 'for'}, status=status.HTTP_400_BAD_REQUEST)
		cache_hit = cache.get(key)
		if cache_hit:
			return Response(cache_hit, status=status.HTTP_200_OK)
		if params:
			data =  self.get_queryset().filter(categories__iexact=params.lower()).order_by('created_at').all()
		else:
			data = self.get_queryset().order_by('created_at').all()
		if data:
			serializer = self.get_serializer(data, many=True)
			cache.set(f"{params}_{page}", serializer.data)
			return Response(
				serializer.data
			, status=status.HTTP_200_OK)
		else:
			return Response([], status=status.HTTP_200_OK)


class ViewListingsInStateView(ListAPIView):
	""" list all the properties in a state """
	serializer_class = PropertiesListSerializer
	queryset = Properties.objects.all()

	def list(self, request, *args, **kwargs):
		""" method to return a response baseed on query received """
		town_name = kwargs.get('town', None)
		if town_name is None:
			return Response({
				'data': 'Please provide a state'
			}, status=status.HTTP_400_BAD_REQUEST)
		query = request.query_params
		state_name = query.get('state', None)
		if state_name is None:
			return Response({
				'data': 'Please provide a country'
			}, status=status.HTTP_400_BAD_REQUEST)


class RetrieveProperty(RetrieveAPIView):
	""" view for users to retrieve a property """
	queryset = Properties.objects.all()
	lookup_field = 'id'
	serializer_class = PropertyDetailSerializer

	def retrieve(self, request, *args, **kwargs) -> Response:
		""" return the information about a property """
		property_id = kwargs.get('id', None)
		if property_id is None:
			return Response({'data': 'Provide a property ID'}, status=status.HTTP_400_BAD_REQUEST)
		cache_key = f"property_{property_id}"
		cache_hit = cache.get(cache_key)
		if cache_hit:
			return Response({
				'data': cache_hit
			}, status=status.HTTP_200_OK)
		property_instance = self.get_object()
		serializer = self.get_serializer(property_instance)
		cache.set(f"property_{property_id}", serializer.data)
		return Response({
			'data': serializer.data
		}, status=status.HTTP_200_OK)


class PropertyActionView(RetrieveUpdateDestroyAPIView):
	"""Allow users to retrieve, update, or delete a property by the user """
	queryset = Properties.objects.all()
	lookup_field = "id"
	serializer_class = PropertyDetailSerializer
	permission_classes = [IsAuthenticated]

	def retrieve(self, request, *args, **kwargs) -> Response:
		property_id = kwargs.get('id')
		if not property_id:
			return Response({'data': 'Please provide a property id'},
							status=status.HTTP_400_BAD_REQUEST)

		cache_key = f"property_{property_id}"
		cache_hit = cache.get(cache_key)
		if cache_hit:
			return Response({'data': cache_hit}, status=status.HTTP_200_OK)

		property_instance = get_object_or_404(Properties, id=property_id)
		serializer = self.get_serializer(property_instance)
		cache.set(cache_key, serializer.data, timeout=3600)
		return Response({'data': serializer.data}, status=status.HTTP_200_OK)

	def update(self, request, *args, **kwargs) -> Response:
		""" method for updating a property """
		user = self.request.user
		property_id = kwargs.get('id', None)
		cache_key = f"property_{property_id}"
		# check if user is the property owner
		property_instance = get_object_or_404(Properties, id=property_id)
		if user.email != property_instance.host.email:
			return Response({
				'data': 'Property can only be edited by owner'
			}, status=status.HTTP_403_FORBIDDEN)
		serializer = self.get_serializer(property_instance,
										 data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			cache.set(cache_key, serializer.data)
			return Response({
				'data': serializer.data,
			}, status=status.HTTP_200_OK)
		return Response({
			'data': serializer.errors
		}, status=status.HTTP_400_BAD_REQUEST)

	def destroy(self, request, *args, **kwargs) -> Response:
		property_id = kwargs.get('id')
		property_instance = get_object_or_404(Properties, id=property_id)
		user = self.request.user
		if user.email != property_instance.host.email and not user.is_admin:
			return Response({
				'data': 'Property can only be deleted by the owner or an admin'
			}, status=status.HTTP_403_FORBIDDEN)
		cache_key = f"property_{property_id}"
		cache.delete(cache_key)
		property_instance.delete()
		return Response({'data': 'Property deleted successfully'},
						status=status.HTTP_204_NO_CONTENT)




