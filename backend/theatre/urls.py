from django.urls import path
from .views import *


urlpatterns =[

    path("add_theatre", view=add_theatre, name='add-theatre'),
    path("get_theatres", view=get_theatres, name='get-theatres'),
    
]