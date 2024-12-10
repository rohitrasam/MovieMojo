from django.urls import path
from.views import *


urlpatterns = [
    path('add_screen', view=add_screen, name='add-screen'),
    path('get_screens', view=get_screens, name='get-screens'),
    path('edit/<int:id>', view=update_screens, name='update-screens'),
    path('delete/<int:id>', view=delete_screen, name='delete-screen'),
    path('get_seats', view=get_seats, name='get-seats'),
    path('update_seats', view=update_seats, name='update-seats'),
    path('assign_seat_type', view=assign_seat_type, name='assign_seat_type'),
    path('get_seat_assignments', view=get_seat_assignments, name='get_seat_assignments'),
    path("get_total_screens", view=get_total_screens, name="get-home-shows"),

]