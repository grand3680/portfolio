import requests
from bs4 import BeautifulSoup
import re
from ..models import *

import time

start_time = time.time()

def parseGitHub():
    response = requests.get('https://github.com/grand3680?tab=repositories')
    soup = BeautifulSoup(response.text, 'html.parser')

    repos = repositories.objects.all()


    # parsing site ( My gitHub ) around 20 repositirios now
    for link in soup.find(id="user-repositories-list").find_all('a'):
        href = link.get('href')
        linkHref = "https://github.com" + href

        point_break = False
        for repos in repositories.objects.all():
            if (href[11::] == repos.name):
                point_break = True
                break
        
        if point_break:
            continue

        responseReadme = requests.get(str(linkHref))
        soupReadme = BeautifulSoup(responseReadme.text, 'html.parser').find(id="readme")

        if "stargazers" in href.lower():
            continue

        txt = ''
        img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRLBsDB48IKOkm60QIQ-XwT1W8KFGe5rPMv2aaU7XtYl7AivIFB7e2qN5d3vxL_4-5294&usqp=CAU'
        findLink = ''
        try:
            txt = soupReadme.find("p").text
            try:
                findLink = str(re.search("(?P<url>https?://[^\s]+)", txt).group("url"))
                txt = txt.replace(findLink,"")
            except:
                print("error link")
        except:
            print("error txt")

        try:
            img = soupReadme.find("img").get('src')
        except:
            print("error img")

        repo = repositories(name=f'{href[11::]}', content=f'{txt}', images=f'{img}')
        repo.save()

    finish_time = time.time() - start_time
    print(f"time: {finish_time}")