from django.db import models
from django.urls import reverse

# my repositories
class repositories(models.Model):
    name = models.CharField(max_length=255, verbose_name="title", null=True)
    content = models.TextField(max_length=255, verbose_name="content", null=True)
    images = models.TextField(max_length=255, verbose_name="images", null=True)


    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'repos'
        verbose_name_plural = 'repos'
    
    def get_absolute_url(self):
        return reverse('post', kwargs={'post_slug': 10})
