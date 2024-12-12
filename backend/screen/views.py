from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework import status
from models.models import *
from .serializers import *

@api_view(['POST'])
def add_screen(request: Request) -> Response: 

    try:
        screen_data = request.data
        city = City.objects.get(name=screen_data['city'])
        theatres = Theatre.objects.filter(name=screen_data['theatre'], address=screen_data['address'], city=city)
        for theatre in theatres:
            screen = Screen.objects.create(name=screen_data['name'], rows=int(screen_data['rows']), cols=int(screen_data['cols']), theatre=theatre)
            seats = []
            for row in range(screen.rows):
                start = ord('A')+row
                for col in range(screen.cols):
                    seats.append(Seat(seat_num=f"{chr(start)}{col+1}", screen=screen))
            Seat.objects.bulk_create(seats)
        return Response(f"{screen.name} added successfully to {theatre.name} {theatre.address} branch in {city}!", status=status.HTTP_200_OK)
    except:
        return Response("Could not add screen.", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_screens(request: Request):
    
    try:
        screens = Screen.objects.all()
        screens = ScreenSerializer(screens, many=True)
        return Response(screens.data, status=status.HTTP_200_OK)
    except:
        return Response("Failed to fetch screens.", status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
def update_screens(request: Request, id: int) -> Response:
    try:
        name = request.data["name"]
        print(request.data)
        if name:
            print(Screen.objects.filter(id=id).update(name=request.data['name']))
            return Response("Screen name updated successfully.", status=status.HTTP_200_OK)
    except:
        return Response("Could not update screen.", status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_screen(request: Request, id: int) -> Response:
    try:
        screen = Screen.objects.get(id=id)
        screen.delete()
        return Response("Screen deleted successfully", status=status.HTTP_200_OK)
    except Movie.DoesNotExist:
        return Response("Screen not found", status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def get_seats(request: Request):
    screen = Screen.objects.prefetch_related('seat_screen')
    return Response(ScreenSeatSerializer(screen, many=True).data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
def update_seats(request):
    try:
        data = request.data
        theatre_data = data['theatre']
        city = City.objects.get(name=data['city'])
        theatre = Theatre.objects.get(name=theatre_data['name'], address=theatre_data['address'], city=city)
        screen = Screen.objects.get(name=data['name'], theatre=theatre)
        Seat.objects.filter(screen=screen, seat_num=data['seats']['seat_num']).update(_type=data["seats"]['_type'],price=data["seats"]['price'])
        return Response("Seat types updated successfully.", status=status.HTTP_200_OK)
    except:
        return Response("Couldn't update seats.", status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_total_screens(request: Request):
    total_screens = len(Screen.objects.all())
    return Response({"total_screens": total_screens}, status=status.HTTP_200_OK)