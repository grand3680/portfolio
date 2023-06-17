from django.urls import path
from . import views
from .models import repositories
from django.views.generic import DetailView


urlpatterns = [
    path('', views.index, name='works'),
    path('repo-<int:pk>/',DetailView.as_view(model=repositories, template_name='main/repo.html'))
]
