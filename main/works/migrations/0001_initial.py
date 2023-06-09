# Generated by Django 4.1.1 on 2023-06-30 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='repositories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, null=True, verbose_name='title')),
                ('content', models.TextField(null=True, verbose_name='content')),
                ('images', models.TextField(null=True, verbose_name='images')),
            ],
            options={
                'verbose_name': 'repos',
                'verbose_name_plural': 'repos',
            },
        ),
    ]
