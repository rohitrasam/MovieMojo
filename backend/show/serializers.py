from rest_framework import serializers
from theatre.serializers import TheatreSerializer
from movie.serializers import MovieSerializer
from screen.serializers import ScreenSerializer
from models.models import Show

class AdminShowSerializer(serializers.ModelSerializer):

    movie = MovieSerializer()
    screen = ScreenSerializer()

    class Meta:

        model = Show
        fields = '__all__'
    

class HomeShowSerializer(serializers.ModelSerializer):

    theatre = serializers.SerializerMethodField()
    movie = serializers.SerializerMethodField() 

    class Meta:
        model = Show
        fields = ['theatre', 'movie']

    def get_theatre(self, obj: Show):
        return TheatreSerializer(obj.screen.theatre).data
    
    def get_movie(self, obj: Show):
        return MovieSerializer(obj.movie).data


""" Implement later """
class BookingShowSerializer(serializers.ModelSerializer):

    class Meta:
        model = Show
        fields = []
