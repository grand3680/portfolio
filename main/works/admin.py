from django.contrib import admin
from .models import *


admin.site.register(repositories)

admin.site.site_title = 'Admin-ponel repositories'
admin.site.site_header = 'Admin-ponel repositories'