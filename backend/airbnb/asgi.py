"""
ASGI config for airbnb project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os


import django
from channels.auth import AuthMiddleware, AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

django.setup()
from channels.security.websocket import AllowedHostsOriginValidator
from channelsmiddleware import JwtAuthMiddlewareStack

from notifications.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'airbnb.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        JwtAuthMiddlewareStack(URLRouter(websocket_urlpatterns))
    )
})
