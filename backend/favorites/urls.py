from django.urls import path

from favorites.views import FavoriteView, FavoriteAction, GetUserFavoritesView

urlpatterns = [
    path("create/<uuid:id>", FavoriteView.as_view(), name="create and list "
                                                     "property "
                                                 "to fav"),
    path("actions/<uuid:id>", FavoriteAction.as_view(), name="delete a "
                                                            "property "
                                                       "from "
                                                    "favorite"),
    path("all/", GetUserFavoritesView.as_view(),
         name="Get all a users favorite")
]
