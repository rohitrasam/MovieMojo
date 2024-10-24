from django.urls import path
from .views import *

urlpatterns = [
    path("add_show", view=add_show, name='add-show'),
]