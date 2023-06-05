from django.shortcuts import render

from django.http import HttpResponse 

# Create your views here.
def index(request):
    print("test")
    return render(request, 'main/information.html')
