from django.contrib import admin
from .models import *

class AuthorAdmin(admin.ModelAdmin):
    list_display = ("name", "content")

admin.site.register(repositories, AuthorAdmin)
admin.site.site_title = 'Admin-ponel repositories'
admin.site.site_header = 'Admin-ponel repositories'