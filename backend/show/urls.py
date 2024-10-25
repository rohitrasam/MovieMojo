from django.urls import path
from .views import *

urlpatterns = [
    path("add_show", view=add_show, name='add-show'),
    path("get_admin_shows", view=get_admin_shows, name="get-admin-shows"),
    path("get_home_shows", view=get_home_shows, name="get-home-shows"),
]