"""
The `urlpatterns` list routes URLs to views. For more information please see:
https://docs.djangoproject.com/en/4.1/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('information/', include('information.urls')),
	path('works/', include('works.urls')),
    path('suppostInfo/', include('supportInfo.urls')),
    path('homePage/', include('homePage.urls')),
]
