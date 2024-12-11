from rest_framework import serializers
from theatre.serializers import CitySerializer, TheatreSerializer
from models.models import *

class SeatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Seat
        fields = '__all__'

class ScreenSerializer(serializers.ModelSerializer):

    theatre = TheatreSerializer()

    class Meta:
        model = Screen
        fields = ['id','name', 'theatre']

class ScreenSeatSerializer(serializers.ModelSerializer):

    seats = serializers.SerializerMethodField()
    theatre = TheatreSerializer()

    class Meta:
        model = Screen
        fields = ['name', 'rows', 'cols', 'theatre', 'seats']

    def get_seats(self, obj: Screen):
        return SeatSerializer(obj.seat_screen.all(), many=True).data


class TheatreScreenSerializer(serializers.ModelSerializer):

    screen_theatre = ScreenSerializer(many=True)
    city = CitySerializer()
    class Meta:
        model = Theatre
        fields = ['id', 'name', 'address', 'city', 'screen_theatre']
    