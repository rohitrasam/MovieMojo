# Generated by Django 5.0.7 on 2024-10-22 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0012_alter_seat__type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='show',
            name='time',
            field=models.DateTimeField(),
        ),
    ]
