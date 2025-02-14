"""
URL configuration for airbnb project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

from django.conf.urls.i18n import i18n_patterns

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from properties.views import GetAllProperties

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0),
         name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('api/property/', include('properties.urls'), name="Properties API"),
    path('api/review/', include('reviews.urls'), name="reviews API"),
    path("api/favorite/", include('favorites.urls'), name="favorites API"),
    path("api/booking/", include('booking.urls'), name="booking API"),
    path("api/token/", TokenObtainPairView.as_view(), name="login view"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="register "
                                                                "view"),
    path("api/user/", include("user.urls"), name="USERS API"),
    path("api/payment/", include("payment.urls"), name="PAYMENT API"),
    path("api/user-preferences/", include("user_preferences.urls"),
         name="USER PREFERENCES API"),
    path("", GetAllProperties.as_view(), name="get all properties"),
]


urlpatterns += i18n_patterns(
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0),
         name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('api/property/', include('properties.urls'), name="Properties API"),
    path('api/review/', include('reviews.urls'), name="reviews API"),
    path("api/favorite/", include('favorites.urls'), name="favorites API"),
    path("api/booking/", include('booking.urls'), name="booking API"),
    path("api/token/", TokenObtainPairView.as_view(), name="login view"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="register "
                                                                "view"),
    path("api/user/", include("user.urls"), name="USERS API"),
    path("api/payment/", include("payment.urls"), name="PAYMENT API"),
    path("api/user-preferences/", include("user_preferences.urls"),
         name="USER PREFERENCES API"),
    path("", GetAllProperties.as_view(), name="get all properties")
)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT )
