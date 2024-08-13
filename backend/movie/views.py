from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from models.models import Movie
from .serializers import MovieSerializer
import datetime

@api_view(["GET"])
def get_movies(request: Request) -> Response:

    movies = Movie.objects.all()
    if movies:
        movies = MovieSerializer(movies, many=True)
        return Response(movies.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_movie(request: Request, id: int) -> Response:

    try:
        movie = Movie.objects.get(id=id)
        print(movie, "line 22")
        if movie:
            movie = MovieSerializer(movie)
            return Response(movie.data, status=status.HTTP_200_OK)
    except:
        return Response("No movie of this name exists", status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
def post_movie(request: Request) -> Response:

    if Movie.objects.filter(name=request.data["name"]).exists():
        return Response("Movie already exists", status=status.HTTP_409_CONFLICT)
    
    release_date = datetime.date.fromisoformat(request.data["release_date"])
    request.data["release_date"]  = release_date
    movie = MovieSerializer(data=request.data)
    if movie.is_valid():
        movie.save()
        return Response("Movie added successfully", status=status.HTTP_200_OK)
    return Response("Failed to enter movie details", status=status.HTTP_400_BAD_REQUEST)