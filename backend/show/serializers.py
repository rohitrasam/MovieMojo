from rest_framework import serializers
from theatre.serializers import TheatreSerializer
from movie.serializers import MovieSerializer
from screen.serializers import ScreenSerializer, SeatSerializer
from models.models import Seat, Show, Booking

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
    
class UserBookingSerializer(serializers.ModelSerializer):

    time = serializers.SerializerMethodField()
    seat = SeatSerializer()
    user = serializers.SerializerMethodField()
    show = serializers.SerializerMethodField()
    screen = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = '__all__'
    
    def get_time(self, obj: Booking):
        return obj.show.time

    def get_user(self, obj: Booking):
        return f"{obj.user.first_name} {obj.user.last_name}"

    def get_show(self, obj: Booking):
        return obj.show.movie.name

    def get_screen(self, obj: Booking):
        return obj.show.screen.name