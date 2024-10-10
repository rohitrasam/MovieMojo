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
        if Theatre.objects.filter(address=theatre['address']).exists():
            return Response("Theatre with same address cannot exist.", status=status.HTTP_409_CONFLICT)
        
        city, _ = City.objects.get_or_create(**theatre.pop('city'))
        theatre = Theatre.objects.create(**theatre, city=city)
        return Response("Theatre added successfully!", status=status.HTTP_200_OK)
    except:
        return Response("Couldn't add theatre.", status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE"])
def delete(response: Response, id: int):
    theatre = Theatre.objects.get(id=id)

    if theatre:
        theatre.delete()
        return Response("Theatre deleted successfully", status=status.HTTP_200_OK)
    return Response("Couldn't delete theatre", status=status.HTTP_400_BAD_REQUEST)

    
