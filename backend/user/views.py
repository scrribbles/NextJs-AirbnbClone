from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from user.serializers import UserSerializer, RegisterUserSerializer, GetBankDetailsSerializer, GetAllBankDetailsSerializer
from .models import User, BankingDetails
from rest_framework_simplejwt.views import TokenRefreshView
# from user_preferences.models import UserPreferences

class GetUserInfoView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    lookup_field = 'id'
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer



class GetAllUsersView(ListAPIView):
    queryset = User.objects.select_related('preferences').all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class GetAllBankingDetailsView(ListCreateAPIView):
    serializer_class = GetAllBankDetailsSerializer
    permission_classes = [IsAuthenticated]
    queryset = BankingDetails.objects.all()

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data.copy()
        data['user'] = user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
            }, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(user=self.request.user)
        # if request.user != queryset.user:
        #     data = AdminViewBankDetailsSerializer(queryset, many=True)
        serializer = self.get_serializer(queryset, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)


class GetBankingDetailsView(RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = GetBankDetailsSerializer
    permission_classes = [IsAuthenticated]
    queryset = BankingDetails.objects.all()

    def get_object(self):
        """ get the user's banking details object """
        return BankingDetails.objects.get(id=self.kwargs.get('id'), user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        bank_details = self.get_object()
        serializer = self.get_serializer(bank_details)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)


class RefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        response.data['user'] = UserSerializer(User.objects.get(email=request.user)).data
        return response
