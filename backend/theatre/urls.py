from django.urls import path
from .views import *


urlpatterns =[

    path("add_theatre", view=add_theatre, name='add-theatre'),
    path("get_theatres", view=get_theatres, name='get-theatres'),
    path("delete/<int:id>", view=delete_theatre, name='delete-theatre'),
    path("get_cities", view=get_cities, name='get_cities'),
    path("add_show", view=assign_movie_to_theatre, name='add_show'),
    path("get_shows", view=get_shows, name='get_shows')
    
]