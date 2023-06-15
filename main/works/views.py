from django.shortcuts import render
from django.http import HttpResponse 

from .scripts.parserGitHub import parseGitHub
# from .scripts.parserGitHun_asynth import main
import asyncio

from .models import *

# asyncio.run(main())
parseGitHub()

context = { 
    'query_results' : repositories.objects.all()
}


# Create your views here.
def index(request):
    return render(request, 'main/workes.html', context)
