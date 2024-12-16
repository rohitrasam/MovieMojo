from rest_framework import serializers
from theatre.serializers import TheatreSerializer
from movie.serializers import MovieSerializer
from screen.serializers import ScreenSerializer
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
    seats = serializers.SerializerMethodField()
    # user = serializers.SerializerMethodField()
    # show = serializers.SerializerMethodField()
    class Meta:
        model = Booking
        fields = '__all__'
    
    def get_time(self, obj: Booking):
        print(obj)
        return obj.show.time
    
    def get_seats(self, obj: Booking):
        return [booking.seat.seat_num for booking in Booking.objects.filter(user=obj.user)]

    # def get_user(self, obj: Booking):
    #     pass

    # def get_show(self, obj: Booking):
    #     pass