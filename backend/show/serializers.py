from rest_framework import serializers
from theatre.serializers import TheatreSerializer
from movie.serializers import MovieSerializer
from screen.serializers import ScreenSerializer
from models.models import Show, Booking

class AdminShowSerializer(serializers.ModelSerializer):

    movie = MovieSerializer()
    screen = ScreenSerializer()
    bookings = serializers.SerializerMethodField()

    class Meta:

        model = Show
        fields = ['screen', 'movie', 'time', 'bookings']

    def get_bookings(self, obj: Show):
        return len(Booking.objects.filter(show=obj))    
    

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