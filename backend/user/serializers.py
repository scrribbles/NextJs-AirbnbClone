from rest_framework import serializers

from reviews.models import Review
from .models import User, BankingDetails
from reviews.serializers import ReviewSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, AuthUser, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import Token

from airbnb import cipher
from user_preferences.serializers import UpdatePreferencesSerializer

class UserSerializer(serializers.ModelSerializer):
    preferences = UpdatePreferencesSerializer()
    class Meta:
        model = User
        # fields = "__all__"
        exclude = ["password"]


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "gender", "email", "password", "gender"
                  ]

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        email = validated_data.pop('email', None)
        user = User.objects.create_user(email=email, password=password,
                                        **validated_data)
        return user


class UserInfoSerializer(serializers.ModelSerializer):
    properties = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = "__all__"

    def get_properties(self, obj):
        """ get all the listings of a user """
        return obj.properties.all()

    def to_representation(self, instance):
        user = super().to_representation(instance)
        # add all reviews for a user's listed property
        # get all user's property
        user_properties = self.get_properties(instance)
        property_reviews = Review.objects.filter(property__in=user_properties)
        user['reviews'] = ReviewSerializer(property_reviews,many=True).data
        return user



class GetBankDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankingDetails
        fields = "__all__"
        extra_kwargs = {
            'user': {'read_only': True}
        }

    def to_representation(self, instance):
        bank_details = super().to_representation(instance)
        bank_details['account_number'] = cipher.decrypt(instance.account_number.encode()).decode()
        return bank_details



class GetAllBankDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankingDetails
        fields = "__all__"
        extra_kwargs = {
            # 'user': {'read_only': True},
            'account_number_hash': {
                'read_only': True},
            "mask_account": {
                'read_only': True
                }

        }

    def create(self, validated_data):
        user = self.context.get('request').user
        is_default = validated_data.get('is_default', None)
        if is_default == True:
            # update any existing bank details to false
            BankingDetails.objects.filter(user=user, is_default=True).update(is_default=False)
        validated_data['user'] = user
        instance = BankingDetails.objects.create(**validated_data)
        return instance

    def to_representation(self, instance):
        bank_details = super().to_representation(instance)
        bank_details['account_number'] = instance.mask_account
        return bank_details

# class AdminViewBankDetailsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = BankingDetails
#         fields = "__all__"

#     def to_representation(self, instance):
#         bank_details = super().to_representation(instance)
#         bank_details['account_number'] = instance.mask_account
#         return bank_details



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom TokenObtainPairSerializer

    Args:
        TokenObtainPairSerializer (class): Base class for token serializers

    Returns:
        Token: Token instance
    """

    @classmethod
    def get_token(cls, user: AuthUser) -> Token:
        """
        Get the token for the user

        Args:
            user (AuthUser): AuthUser instance

        Returns:
            Token: Token instance
        """
        token = super().get_token(user)
        # add custom claims
        token['email'] = user.email
        token['full_name'] = user.get_full_name
        token['language'] = user.preferences.language
        token['currency'] = user.preferences.currency
        token['timezone'] = user.preferences.timezone

        return token
