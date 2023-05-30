from django.shortcuts import render

from django.http import HttpResponse 

import requests
from bs4 import BeautifulSoup

response = requests.get('https://github.com/grand3680?tab=repositories')
soup = BeautifulSoup(response.text, 'html.parser')

# Create your views here.
def index(request):
    #links = []
    links = []

    for link in soup.find(id="user-repositories-list").find_all('a'):
        #links.append(("https://github.com" + link.get('href'))
        href = link.get('href')
        linkHref = "https://github.com" + href

        links.append([linkHref, href[11::]])
    

    context = { 'query_results' : links }

    #print(links)
    return render(request, 'main/workes.html', context)
