# Generated by Django 5.0.7 on 2024-10-21 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0011_alter_show_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seat',
            name='_type',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
