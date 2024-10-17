from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from models.models import *
from .serializers import *



@api_view(["GET"])
def get_theatres(request: Request) -> Response:

    theatres = Theatre.objects.all()
    theatres = TheatreSerializer(theatres, many=True)
    return Response(theatres.data, status=status.HTTP_200_OK)

@api_view(["POST"])
def add_theatre(request: Request) -> Response:

    try:
        theatre = request.data
        city, _ = City.objects.get_or_create(**theatre.pop('city'))
        if Theatre.objects.filter(address=theatre['address'], city=city).exists():
            return Response("Theatre with same address cannot exist.", status=status.HTTP_409_CONFLICT)
        
        theatre = Theatre.objects.create(**theatre, city=city)
        return Response("Theatre added successfully!", status=status.HTTP_200_OK)
    except:
        return Response("Couldn't add theatre.", status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE"])
def delete_theatre(response: Response, id: int):
    theatre = Theatre.objects.get(id=id)

    if theatre:
        theatre.delete()
        return Response("Theatre deleted successfully", status=status.HTTP_200_OK)
    return Response("Couldn't delete theatre", status=status.HTTP_400_BAD_REQUEST)
 
@api_view(["GET"])
def get_cities(request: Request) -> Response:
    cities = City.objects.all()
    cities = CitySerializer(cities, many=True)
    return Response(cities.data, status=status.HTTP_200_OK)

@api_view(["PUT"])
def update_theatre(request: Request, id: int):
    try:
        theatre = Theatre.objects.get(id=id)
    except Theatre.DoesNotExist:
        return Response({"error": "Theatre not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = TheatreSerializer(theatre, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def assign_movie_to_theatre(request: Request) -> Response:
    
    try:
        data = request.data
        city = City.objects.get(name=data["city"])
        theatres = Theatre.objects.filter(name=data["theatre"], city=city)
        movie = Movie.objects.get(name=data["movie"])
        for theatre in theatres:
            screen = Screen.objects.create(name=f"Screen1-{theatre}", rows=50, cols=50, theatre=theatre)
            show = Show.objects.create(screen=screen, movie=movie)

        return Response(f"Show added successfully -: {show}", status=status.HTTP_200_OK)
    except:
        return Response("Could not add a show.", status=status.HTTP_400_BAD_REQUEST)
        

@api_view(["GET"])
def get_shows(request: Request) -> Response:
    try:
        shows = Show.objects.all()
        shows = ShowSerializer(shows, many=True) 
        return  Response(shows.data, status=status.HTTP_200_OK)
    except:
        return Response("Failed fetch shows", status=status.HTTP_400_BAD_REQUEST)
