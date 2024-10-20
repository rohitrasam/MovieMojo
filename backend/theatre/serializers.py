from rest_framework import serializers
from movie.serializers import MovieSerializer
from models.models import *


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'


class TheatreSerializer(serializers.ModelSerializer):

    city = CitySerializer()
    # city = serializers.SerializerMethodField()
    
    class Meta:
        model = Theatre
        fields = ['id', 'name', 'address', 'city', 'screen_count']
        extra_kwargs = {
            'screen_count': {'read_only': True}
        }
    
    # def get_city(self, obj: Theatre):
    #     return CitySerializer(obj.city).data

class ShowSerializer(serializers.ModelSerializer):
    movie = MovieSerializer()
    theatre = serializers.SerializerMethodField()

    class Meta:
        model = Show
        fields = ['id','movie', 'theatre']
    
    def get_theatre(self, obj: Show):
        return TheatreSerializer(obj.screen.theatre).data