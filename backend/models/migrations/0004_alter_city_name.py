# Generated by Django 5.0.7 on 2024-09-05 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0003_alter_appuser_first_name_alter_appuser_last_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='city',
            name='name',
            field=models.CharField(choices=[('Pune', 'Pune'), ('Mumbai', 'Mumbai'), ('Delhi', 'Delhi'), ('Bengaluru', 'Bengaluru'), ('Ahmedabad', 'Ahmedabad'), ('Kolkata', 'Kolkata')], default=None, max_length=25, unique=True),
        ),
    ]
