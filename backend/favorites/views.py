from rest_framework import status
from rest_framework.generics import CreateAPIView, get_object_or_404, \
    DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from properties.models import Properties
from .models import Favorite
from .serializers import FavoriteSerializer


# Create your views here.
class FavoriteView(CreateAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        property_id = kwargs.get('id', None)
        if property_id is None:
            return Response({
                'data': 'Please provide a property to be added to favorite'
            }, status=status.HTTP_400_BAD_REQUEST)
        user = request.user
        property_instance = get_object_or_404(Properties, id=property_id)
        user_favorite, created = Favorite.objects.get_or_create(
            user=user, property=property_instance)
        if not created:
            return  Response({
                'data': 'Property already in user favorites'
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'data': 'Property added to favorites'
        }, status=status.HTTP_201_CREATED)


class FavoriteAction(DestroyAPIView):
    queryset = Favorite.objects.all()
    lookup_field = "id"
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Favorite, property__id=self.kwargs.get('id'))


class GetUserFavoritesView(ListAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        """ get all a users favorites """
        user_instance = Favorite.objects.filter(user=request.user).exists()
        if user_instance is None:
            return Response({
                "data": "User does not have any properties in favorites"
            }, status=status.HTTP_404_NOT_FOUND)
        favorites = Favorite.objects.filter(user=request.user)
        serializer = self.get_serializer(favorites, many=True)
        return Response({
            'data': serializer.data
        }, status=status.HTTP_200_OK)

