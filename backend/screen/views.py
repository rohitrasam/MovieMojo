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
def update_screens(request):
    data=request.data
    name=data.get('name')
    if name:
        Screen.objects.filter(id=id).update(name=name)
        return Response({"message": "Screen name updated successfully."}, status=200)
    return Response({"error": "Invalid data."}, status=400)

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
    data = request.data
    seat_numbers = data.get('seat_numbers', [])
    seat_type = data.get('seat_type')

    if seat_type and seat_numbers:
        Seat.objects.filter(seat_num__in=seat_numbers).update(_type=seat_type)
        return Response({"message": "Seat types updated successfully."}, status=200)
    return Response({"error": "Invalid data."}, status=400)

@api_view(['POST'])
def assign_seat_type(request):
    seat_assignments_data = request.data  # This will be a list of dictionaries
    if isinstance(seat_assignments_data, list):  # Check if it's a list
        serializer = SeatAssignmentSerializer(data=seat_assignments_data, many=True)  # Pass many=True
        if serializer.is_valid():
            serializer.save()  # Save all assignments
            return Response({"message": "Seat types assigned successfully!"}, status=201)
        return Response(serializer.errors, status=400)
    return Response({"error": "Expected a list of seat assignments."}, status=400)  # Handle invalid input


@api_view(['GET'])
def get_seat_assignments(request):
    try:
        assignments = SeatAssignment.objects.all()
        serializer = SeatAssignmentSerializer(assignments, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["GET"])
def get_total_screens(request: Request):
    total_screens = len(Screen.objects.all())
    return Response({"total_screens": total_screens}, status=status.HTTP_200_OK)