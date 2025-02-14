from uuid import uuid4
from django.db import models
from django.utils.translation import gettext_lazy as _
from location.models import Address
from amenities.models import Amenity
from user.models import User


class Properties(models.Model):
    BOOKING_TYPE = [('instant', _('INSTANT')), ('booking', _('BOOKING'))]
    id = models.UUIDField(default=uuid4, editable=False, primary_key=True)
    name = models.CharField(null=False, blank=True, max_length=255,
                            help_text="Enter the name of the property (e.g., 'Sunset Villa').")
    address = models.OneToOneField(Address, related_name='property',
                                   on_delete=models.CASCADE,
                                   help_text="Specify the address of the "
                                   "property.")
    amenities = models.ManyToManyField(Amenity,
                                       blank=True, related_name='properties',
                                       help_text="Select the amenities available for this property.")
    price_per_night = models.DecimalField(decimal_places=2, max_digits=5,
                                          null=False)
    max_guests = models.IntegerField(db_default=5, default=5, null=False)
    bathrooms = models.IntegerField(null=False)
    bedrooms = models.IntegerField(null=False)
    categories = models.CharField(max_length=25, null=False)
    beds = models.IntegerField(null=False)
    pets_allowed = models.BooleanField(default=False)
    parking_space = models.BooleanField(default=False)
    discount = models.DecimalField(decimal_places=2, max_digits=5,
                                   null=True, blank=True,
                                   help_text="Discount as a percentage (e.g., 20 for 20%).")
    host = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='properties', help_text="The owner of the property")
    cleaning_fee = models.DecimalField(null=True, blank=True, max_digits=5,
                                       decimal_places=2)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    booking_type = models.CharField(max_length=20, choices=BOOKING_TYPE, help_text="The type of booking that this property has",
                                    null=False, blank=False, default="instant", db_default="instant")

    def __str__(self):
        return self.name

    @property
    def discounted_price(self):
        if self.discount:
            return self.price_per_night * (1 - self.discount / 100)
        return self.price_per_night

    class Meta:
        verbose_name = "property"
        verbose_name_plural = "properties"
        ordering = ["name"]



class PropertyImages(models.Model):
    category = models.CharField(max_length=255, null=True, blank=True)
    user_property = models.ForeignKey(Properties, on_delete=models.CASCADE, related_name='images', help_text='Add images of your property')
    _image = models.ImageField(upload_to='images/properties/', null=True, blank=True)


    def __str__(self):
        return f"{self._image} for {self.user_property.name}"

    class Meta:
        verbose_name = "Property Image"
        verbose_name_plural = "Property Images"

    @property
    def image(self):
        return f"/media/{self._image}"

    @image.setter
    def image(self, value):
        self._image = value
