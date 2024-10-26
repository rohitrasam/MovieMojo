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

@api_view(["PATCH"])
def update_theatre(request: Request, id: int):
    try:
        city = City.objects.get(name=request.data["city"])
        request.data['city'] = city
        theatre = Theatre.objects.filter(id=id).update(**request.data)
        return Response("Theatre updated.", status=status.HTTP_200_OK)
    except:
        return Response("Could not update theatre. Try again.", status=status.HTTP_404_NOT_FOUND)
