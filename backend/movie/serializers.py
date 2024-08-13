from rest_framework.serializers import ModelSerializer
from rest_framework import fields
from models.models import Movie


class MovieSerializer(ModelSerializer):

    class Meta:
        model = Movie
        fields = "__all__" 