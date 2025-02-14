import math

from rest_framework import serializers

from amenities.serializers import AmenitySerializer
from location.serializers import AddressSerializer
from properties.models import Properties
from reviews.serializers import ReviewSerializer
from user.serializers import UserSerializer

class CreatePropertySerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)
    )

    class Meta:
        model = Properties
        fields = "__all__"


class PropertiesListSerializer(serializers.ModelSerializer):
    """ class to show the properties as a summary, ideal for the homepage or search results """
    address = AddressSerializer()
    rating = serializers.SerializerMethodField()
    bookmarked = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    class Meta:
        model = Properties
        fields = ["id", "address", "price_per_night", "rating", "bookmarked", "images"]

    def get_rating(self, obj: 'Properties') -> int:
        """
                method field to get the average rating for a property

                Args:
                        obj - property instance to be queried
        """
        reviews = obj.reviews.all()
        number_of_reviews = reviews.count()
        if number_of_reviews == 0:
            return 0
        average_rating = sum(
            (reviews.rating for reviews in reviews)) / number_of_reviews
        return round(average_rating, 2)

    def get_images(self, obj: 'Properties') -> list:
        """_summary_

        Args:
            obj (Properties): _description_

        Returns:
            list: _description_
        """
        return [i.image for i in obj.images.all()]

    def get_bookmarked(self, obj: 'Properties') -> bool:
        """
                method field to check if a property has been bookmarked by a user

                Args:
                        obj - property instance to be queried
        """
        user = self.context.get('request').user
        if user.is_authenticated:
            obj.favorited_by.filter(user=user).exists()
            print(user)
            return obj.favorited_by.filter(user=user).exists()
        return False


class PropertyDetailSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()
    amenities = AmenitySerializer(many=True)
    host = UserSerializer()
    reviews = ReviewSerializer(many=True, read_only=True)
    address = AddressSerializer()

    class Meta:
        model = Properties
        fields = "__all__"

    @staticmethod
    def get_rating(obj):
        """
                                method field to get the average rating for a property

                                Args:
                                        obj - property instance to be queried
                        """
        reviews = obj.reviews.all()
        number_of_reviews = reviews.count()
        if number_of_reviews == 0:
            return 0
        average_rating = sum(
            (reviews.rating for reviews in reviews)) / number_of_reviews
        return round(average_rating, 2)

    def to_representation(self, instance):
        """ customize the output that is to be sent as a response """
        representation = super().to_representation(instance)
        discounted_price = instance.discounted_price
        representation['discounted_price'] = discounted_price
        return representation
