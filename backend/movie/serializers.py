from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import fields
from models.models import *


class ActorSerializer(ModelSerializer):

    class Meta:
        model = Actor
        exclude = ['id']


class FormatSerializer(ModelSerializer):

    class Meta:
        model = Format
        exclude = ['id']


class GenreSerializer(ModelSerializer):

    class Meta:
        model = Genre
        exclude = ['id']


class LanguageSerializer(ModelSerializer):

    class Meta:
        model = Language
        exclude = ['id']


class CastSerializer(ModelSerializer):

    actor = ActorSerializer()
    class Meta:
        model = Cast
        fields = '__all__'


class MovieFormatSerializer(ModelSerializer):

    _format = FormatSerializer()

    class Meta:
        model = MovieFormat
        fields = '__all__'


class MovieGenreSerializer(ModelSerializer):

    genre = GenreSerializer()
    class Meta:
        model = MovieGenre
        fields = '__all__'


class MovieLanguageSerializer(ModelSerializer):

    language = LanguageSerializer(read_only=True)
    class Meta:
        model = MovieLanguage
        fields = '__all__'

class MovieSerializer(ModelSerializer):

    cast = SerializerMethodField()
    genres = SerializerMethodField()
    languages = SerializerMethodField()
    formats = SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'name', 'desc', 'rating', 'release_date', 'duration', 'languages','genres', 'cast', 'formats']

    def create(self, validated_data: dict):
        return self.Meta.model.objects.create(**validated_data)

    def get_languages(self, obj):
        """
            select_related is used so that the db is not called `n` number of times while returing data 
        """
        movie_languages = MovieLanguage.objects.select_related("language").filter(movie=obj)
        return LanguageSerializer([ml.language for ml in movie_languages], many=True).data

    def get_genres(self, obj):
        movie_genres = MovieGenre.objects.select_related('genre').filter(movie=obj)
        return GenreSerializer([mg.genre for mg in movie_genres], many=True).data

    def get_cast(self, obj):
        movie_cast = Cast.objects.select_related('actor').filter(movie=obj)
        return ActorSerializer([mc.actor for mc in movie_cast], many=True).data

    def get_formats(self, obj):
        movie_formats = MovieFormat.objects.select_related('_format').filter(movie=obj)
        return FormatSerializer([mf._format for mf in movie_formats], many=True).data

