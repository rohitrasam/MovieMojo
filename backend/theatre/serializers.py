from rest_framework import serializers
from models.models import *


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'


class TheatreSerializer(serializers.ModelSerializer):

    city = CitySerializer()
    # screen_theatre = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    # screen_theatre = serializers.StringRelatedField(many=True, read_only=True)
    # city = serializers.SerializerMethodField()
    
    class Meta:
        model = Theatre
        # fields = ['id', 'name', 'address', 'city', 'screen_count', 'screen_theatre']
        fields = ['id', 'name', 'address', 'city', 'screen_count']
        extra_kwargs = {
            'screen_count': {'read_only': True}
        }
    
    # def get_city(self, obj: Theatre):
    #     return CitySerializer(obj.city).data
