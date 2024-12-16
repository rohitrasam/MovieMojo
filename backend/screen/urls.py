from django.urls import path
from.views import *


urlpatterns = [
    path('add_screen', view=add_screen, name='add-screen'),
    path('get_screens', view=get_screens, name='get-screens'),
    path('edit/<int:id>', view=update_screens, name='update-screens'),
    path('delete/<int:id>', view=delete_screen, name='delete-screen'),
    path('get_seats', view=get_seats, name='get-seats'),
    path('get_screen_seats/<int:screen_id>', view=get_screen_seats, name='get-screen-seats'),
    path('update_seats', view=update_seats, name='update-seats'),
    path("get_total_screens", view=get_total_screens, name="get-home-shows"),

]