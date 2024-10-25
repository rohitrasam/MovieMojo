from .serializers import AdminShowSerializer, HomeShowSerializer
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
        time = datetime.datetime.fromisoformat(data['datetime'])
        if Show.objects.filter(screen=screen, time=time).first():
            return Response("Show with given screen and time already exists. Please choose another screen or time.", status=status.HTTP_409_CONFLICT)
        movie = Movie.objects.get(name=data['movie'])
        show = Show.objects.create(screen=screen, movie=movie, time=time)
        return Response(f"Show added successfully!", status=status.HTTP_200_OK)
    except:
        return Response("Couldn't add show.", status=status.HTTP_400_BAD_REQUEST)

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