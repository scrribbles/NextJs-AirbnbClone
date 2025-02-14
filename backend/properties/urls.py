from django.urls import path

from .views import GetAllProperties, RetrieveProperty, PropertyActionView, CreatePropertyView

urlpatterns = [
    path("list/", GetAllProperties.as_view(), name="get all properties"),
    path("view-property/<uuid:id>/", RetrieveProperty.as_view(), name="view "
                                                                "property "
                                                            "as regular user"),
    path("property/action/<uuid:id>/", PropertyActionView.as_view(),
         name="edit, update and delete property as user or admin"),
    path("create/", CreatePropertyView.as_view(), name="Create a property")
]
