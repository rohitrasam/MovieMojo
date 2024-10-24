from rest_framework import serializers
from theatre.serializers import TheatreSerializer
from models.models import *


class ScreenSerializer(serializers.ModelSerializer):

    theatre = serializers.SerializerMethodField()

    class Meta:
        model = Screen
        fields = ['name', 'theatre']
    
    def get_theatre(self, obj: Screen) -> str:
        return TheatreSerializer(obj.theatre).data['name']