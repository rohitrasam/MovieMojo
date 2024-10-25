from rest_framework import serializers
from theatre.serializers import TheatreSerializer
from models.models import *


class ScreenSerializer(serializers.ModelSerializer):

    theatre = TheatreSerializer()

    class Meta:
        model = Screen
        fields = ['name', 'theatre']