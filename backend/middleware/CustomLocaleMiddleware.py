from asgiref.sync import sync_to_async
from django.utils.translation import activate

from asgiref.sync import iscoroutinefunction, markcoroutinefunction
from user_preferences.models import UserPreferences
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

class CustomLocaleMiddleware:

    async_capable = True
    def __init__(self, get_response):
        self.get_response = get_response
        if iscoroutinefunction(self.get_response):
            markcoroutinefunction(self)


    async def __call__(self, request):
        response = await self.get_response(request)
        print("====> ", response)
        # Use synchronous method for admin and other synchronous contexts
        if request.user.is_authenticated:
            try:
                user_prefs = sync_to_async(UserPreferences.objects.filter(user=request.user).first())

                if user_prefs and user_prefs.language:
                    activate(user_prefs.language)
                    request.LANGUAGE_CODE = user_prefs.language
                else:
                    activate(settings.LANGUAGE_CODE)
            except Exception:
                activate(settings.LANGUAGE_CODE)
        return response

    # async def __call_async(self, request):
        # Async version for async contexts
        if request.user.is_authenticated:
            try:
                user_prefs = await sync_to_async(
                    lambda: UserPreferences.objects.filter(user=request.user).first()
                )()

                if user_prefs and user_prefs.language:
                    activate(user_prefs.language)
                    request.LANGUAGE_CODE = user_prefs.language
                else:
                    activate(settings.LANGUAGE_CODE)
            except Exception:
                activate(settings.LANGUAGE_CODE)

        response = await self.get_response(request)
        return response
