from .serializers import AdminShowSerializer, HomeShowSerializer, UserBookingSerializer
from models.models import *
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.decorators import api_view
import datetime

@api_view(["POST"])
def add_show(request: Request):
    try:
        data = request.data
        city = City.objects.get(name=data['city'])
        address = data['address']
        theatre = Theatre.objects.get(name=data['theatre'], address=address, city=city)
        screen = Screen.objects.get(name=data['screen'], theatre=theatre)
        time = datetime.datetime.fromisoformat(" ".join(data['datetime'])+":00")
        if Show.objects.filter(screen=screen, time=time).first():
            return Response("Show with given screen and time already exists. Please choose another screen or time.", status=status.HTTP_409_CONFLICT)
        movie = Movie.objects.get(name=data['movie'])
        show = Show.objects.create(screen=screen, movie=movie, time=time)
        return Response(f"Show added successfully!", status=status.HTTP_200_OK)
    except:
        return Response("Couldn't add show.", status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
def update_show(request: Request, id: int):
    pass

@api_view(["DELETE"])
def delete_show(request: Request, id: int):
    pass

@api_view(["GET"])
def get_admin_shows(request: Request):
    try:
        shows = Show.objects.all()
        shows = AdminShowSerializer(shows, many=True)
        return Response(shows.data, status=status.HTTP_200_OK)
    except:
        return Response("Couldn't fetch shows.", status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
def get_home_shows(request: Request):
    try:
        shows = Show.objects.all().select_related("movie")
        shows = HomeShowSerializer(shows, many=True)
        return Response(shows.data, status=status.HTTP_200_OK)
    except:
        return Response("Couldn't fetch shows.", status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_booking_shows(request: Request, name: str):

    movie = Movie.objects.get(name=name)
    shows = Show.objects.filter(movie=movie)
    shows = AdminShowSerializer(shows, many=True)
    return Response(shows.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_total_shows(request: Request):
    total_shows = len(Show.objects.all())
    return Response({"total_shows": total_shows}, status=status.HTTP_200_OK)

@api_view(["POST"])
def add_booking(request: Request):
    try:
        data = request.data
        movie = Movie.objects.get(name=data["movie"])
        show = Show.objects.get(movie=movie, time=data['time'])
        user = AppUser.objects.get(email=data['email'])
        seats = Seat.objects.filter(screen=show.screen.id, seat_num__in=request.data["seats"])
        for seat in seats:
            booking = Booking.objects.create(show=show, user=user, seat=seat)
        return Response("Seats booked successfully!", status=status.HTTP_200_OK)
    except Exception as e:
        return Response("Couldn't book seats. Please try again!", status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_user_booking(request: Request, user_id: int):
    user = AppUser.objects.get(id=user_id)
    bookings_data = user.booking_user.all()
    bookings = UserBookingSerializer(bookings_data, many=True)
    return Response(bookings.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_total_bookings(request: Request):
    
    data = Booking.objects.all()
    return Response({"total_bookings": len(data)}, status=status.HTTP_200_OK)