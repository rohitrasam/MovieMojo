from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from models.models import *
from .serializers import *
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
        if movie:
            movie = MovieSerializer(movie)
            return Response(movie.data, status=status.HTTP_200_OK)
    except:
        return Response("No movie of this name exists", status=status.HTTP_404_NOT_FOUND)

def save_data(data_list: list[Language | Genre | Format], data_obj: Language | Genre | Format, movie: Movie):

        obj: MovieLanguage | MovieGenre | MovieFormat = None
        in_data: list[MovieLanguage | MovieGenre | MovieFormat] = []

        for data in data_list:
            data, created = data_obj.objects.get_or_create(**data)
            if type(data) == Language:
                obj = MovieLanguage
                data = {"movie": movie, "language": data}
                # if obj.objects.filter(**data).exists():
                #     continue
            elif type(data) == Genre:
                obj = MovieGenre
                data = {"movie": movie, "genre": data}
                # if obj.objects.filter(**data).exists():
                #     continue
            elif type(data) == Format:
                obj = MovieFormat
                data = {"movie": movie, "format": data}
            if obj.objects.filter(**data).exists():
                continue
            in_data.append(obj(**data))

        if in_data:
            obj.objects.bulk_create(in_data)

@api_view(["POST"])
def post_movie(request: Request) -> Response:

    if Movie.objects.filter(name=request.data["name"]).exists():
        return Response("Movie already exists", status=status.HTTP_409_CONFLICT)
    
    release_date = datetime.date.fromisoformat(request.data["release_date"])
    request.data["release_date"] = release_date
    movie = MovieSerializer(data=request.data)

    if movie.is_valid():
        movie = movie.save()
        languages = request.data["languages"]
        formats = request.data["formats"]
        genres = request.data["genres"]

        save_data(languages, Language, movie)
        save_data(genres, Genre, movie)
        save_data(formats, Format, movie)

        return Response("Movie added successfully", status=status.HTTP_200_OK)
    return Response("Failed to enter movie details", status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_movie(request: Request, id: int) -> Response:
    try:
        movie = Movie.objects.get(id=id)
        movie.delete()
        return Response("Movie deleted successfully", status=status.HTTP_200_OK)
    except Movie.DoesNotExist:
        return Response("Movie not found", status=status.HTTP_404_NOT_FOUND)


@api_view(["PATCH"])
def update_movie(request: Request, id: int) -> Response:
    try:
        languages = request.data.pop("languages")
        genres = request.data.pop("genres")
        formats = request.data.pop("formats")
        cast = request.data.pop("cast")
        print(request.data)
        movie = Movie.objects.filter(id=id).update(**request.data)
        movie = Movie.objects.get(id=id)

        save_data(languages, Language, movie)
        save_data(genres, Genre, movie)
        save_data(formats, Format, movie)

        return Response("Movie details updated succesfully!", status=status.HTTP_200_OK)
    except:
        return Response("Could not update movie details.", status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_languages(request: Request):
    languages = Language.objects.all()
    languages = LanguageSerializer(languages, many=True)
    return Response(data=languages.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_genres(request: Request):
    genres = Genre.objects.all()
    genres = GenreSerializer(genres, many=True)
    return Response(data=genres.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_formats(request: Request):
    formats = Format.objects.all()
    formats = FormatSerializer(formats, many=True)
    return Response(data=formats.data, status=status.HTTP_200_OK)
