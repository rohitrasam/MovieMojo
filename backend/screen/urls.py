from django.urls import path
from.views import *


urlpatterns = [
    path('add_screen', view=add_screen, name='add-screen'),
    path('get_screens', view=get_screens, name='get-screens'),
]