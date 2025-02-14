from typing import Union
from uuid import UUID

from django.db.models import QuerySet
from django.utils.translation import gettext as _
from rest_framework.generics import ListCreateAPIView, \
    RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, BasePermission

from rest_framework.generics import get_object_or_404

from rest_framework import status
from rest_framework.response import Response

from .models import Booking
from properties.models import Properties
from .serializers import BookingSerializer, PropertyOwnerBookingSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class IsPropertyOwner(BasePermission):

    def has_object_permission(self, request, view, obj) -> bool:
        return obj.property.host == request.user


class BookingView(ListCreateAPIView):
    """ view for handling views """
    permission_classes = [IsAuthenticated]
    serializer_class = BookingSerializer

    def list(self, request, *args, **kwargs) -> Response:
        """ list view for getting all views """
        user = request.user
        bookings = Booking.objects.filter(guest=user)
        serializer = self.get_serializer(bookings, many=True)
        return Response({
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs) -> Response:
        """ method for creating a booking """
        property_id = kwargs.get('id', None)
        if property_id is None:
            return Response({
                'data': _('Please provide a property')
            }, status=status.HTTP_404_NOT_FOUND)
        property_instance = get_object_or_404(Properties, id=property_id)
        if self.request.user == property_instance.host:
            return Response({
                'data': _('Property owner cannot book his own property')
            }, status=status.HTTP_403_FORBIDDEN)
        if self.check_existing_user_booking(property_id):
            return Response({
                'data': _('Booking with same property by user already '
                        'exists')
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data,
                                         context={
                                             'property_instance':
                                                 property_instance})
        serializer.is_valid(raise_exception=True)
        if property_instance.booking_type == 'instant':
            serializer.save(property=property_instance,
                        guest=request.user, status='confirmed')
        else:
            serializer.save(property=property_instance,
                        guest=request.user)
        return Response({
            'data': _("Property successfully booked")
        }, status=status.HTTP_201_CREATED)

    def check_existing_user_booking(self, property_id: UUID) -> bool:
        """ method to check if a user already has a booking as
        to prevent double booking """
        return Booking.objects.filter(property__id=property_id,
                                       guest=self.request.user).exists()


class UpdateBookingView(RetrieveUpdateDestroyAPIView):
    """ view for retrieving, updating and deleting booking """
    lookup_field = 'id'
    serializer_class = BookingSerializer

    def get_object(self) -> Union[Response, QuerySet]:
        params = self.request.query_params
        booking_id = params.get('q', None)
        if not booking_id:
            return Response({
                'data': _('No booking provided')
            }, status=status.HTTP_400_BAD_REQUEST)
        return get_object_or_404(Booking, id=booking_id)

    def update(self, request, *args, **kwargs) -> Response:
        """ update property """
        request = self.request.data
        booking_instance = self.get_object()
        if booking_instance is None:
            return Response({
                'data': _('No booking found')
            }, status=status.HTTP_404_NOT_FOUND)
        if (booking_instance.status == 'confirmed' or
                booking_instance.status == 'completed'):
            return Response({
                'data': _('Booking has already been confirmed and '
                        'cannot be edited')
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(booking_instance,
                                         data=request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_200_OK)


class PropertyOwnerBookingView(RetrieveUpdateAPIView):
    lookup_field = 'id'
    serializer_class = PropertyOwnerBookingSerializer
    permission_classes = [IsAuthenticated, IsPropertyOwner]
    queryset = Booking.objects.all()

    def update(self, request, *args, **kwargs) -> Response:
        """ update a booking """
        booking_instance = self.get_object()
        if booking_instance.status in ['completed', 'rejected',
                                       'confirmed']:
            return Response({
                'data': _('Cannot update a completed, confirmed or '
                        'rejected booking')
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(booking_instance,
                                         data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_200_OK)



