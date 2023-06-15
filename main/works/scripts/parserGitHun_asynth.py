import requests
from bs4 import BeautifulSoup
import re
from ..models import *

import time


import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rest.settings')
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()
    
# repositories.objects.all()

start_time = time.time()


import aiohttp
import asyncio

async def get_repository_info(username, href):
    url = f"https://github.com/{username}/{href[11::]}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                response_text = await response.text()

                # responseReadme = requests.get(str(linkHref))
                soupReadme = BeautifulSoup(response_text, 'html.parser').find(id="readme")
                print(soupReadme)

                if "stargazers" in href.lower():
                    return

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
            else:
                print("Error retrieving repository information.")

# Example usage
async def main():
    tasks = []
    # tasks.append(asyncio.create_task(get_repository_info("grand3680", "repository-name1")))
    # tasks.append(asyncio.create_task(get_repository_info("grand3680", "repository-name2")))
    # Add more tasks for additional repositories

    tasks.append(asyncio.create_task(get_repository_info("grand3680", "LiveCells")))

    # url = "https://github.com/grand3680?tab=repositories"
    # soup = BeautifulSoup(url, "html.parser")


    # for repo in soup.find(id="user-repositories-list").find_all('a'):
    #     href = repo.get('href')
    #     point_break = False
    #     for repos in repositories.objects.all():
    #         if (href[11::] == repos.name):
    #             point_break = True
    #             break
        
    #     if point_break:
    #         continue

    #     task = asyncio.create_task(get_repository_info("grand3680", href))
    #     tasks.append(task)

    await asyncio.gather(*tasks)

    finish_time = time.time() - start_time
    print(f"time: {finish_time}")

# Run the main function