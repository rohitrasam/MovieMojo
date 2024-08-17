from django.urls import path
from .views import *

urlpatterns =[
    path('get_movies', view=get_movies, name="get-movies"),
    path('get_movie/<int:id>', view=get_movie, name="get-movie"),
    path('post_movie', view=post_movie, name="post-movie"),
]