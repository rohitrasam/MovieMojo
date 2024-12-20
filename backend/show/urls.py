from django.urls import path
from .views import *

urlpatterns = [
    path("add_show", view=add_show, name='add-show'),
    path("get_admin_shows", view=get_admin_shows, name="get-admin-shows"),
    path("get_home_shows", view=get_home_shows, name="get-home-shows"),
    path("get_booking_shows/<str:name>", view=get_booking_shows, name="get-booking-shows"),
    path("get_total_shows", view=get_total_shows, name="get-home-shows"),
    path("add_booking", view=add_booking, name="add-booking"),
    path("get_user_booking/<int:user_id>", view=get_user_booking, name="get-user-booking"),
    path("get_total_booking", view=get_total_bookings, name="get-total-booking"),
]