# Generated by Django 5.0.7 on 2024-10-16 14:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0009_alter_show_screen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='show',
            name='screen',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='show_screen', to='models.screen'),
        ),
    ]
