from django.shortcuts import render
from django.http import HttpResponse 

from .scripts.parserGitHub import parseGitHub

from .models import *

muCont = repositories.objects.all()

parseGitHub()

context = { 
    'query_results' : repositories.objects.all()
}


# Create your views here.
def index(request):
    return render(request, 'main/workes.html', context)
