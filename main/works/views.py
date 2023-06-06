from django.shortcuts import render
from django.http import HttpResponse 

from .scripts.parserGitHub import parseGitHub


context = { 
    'query_results' : parseGitHub() 
}

# Create your views here.
def index(request):
    return render(request, 'main/workes.html', context)
