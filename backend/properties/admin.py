from django.contrib import admin

from .models import Properties, PropertyImages
from user.models import User
# Register your models here.

class UserInline(admin.StackedInline):
    model = User

class PropertiesAdmin(admin.ModelAdmin):
    list_display = ['host', 'address', 'price_per_night']
admin.site.register(Properties, PropertiesAdmin)
admin.site.register(PropertyImages)
