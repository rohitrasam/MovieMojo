from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from models.models import AppUser
from .serializers import AppUserSerializer
from rest_framework import status
from django.contrib.auth import authenticate


@api_view(['POST'])
def user_signup(request: Request):
    try:
        print (request.data)
        if AppUser.objects.filter(email=request.data['email']).exists():
            return Response("User already exists.", status=status.HTTP_409_CONFLICT)

        user = AppUserSerializer(data=request.data)
        if user.is_valid(raise_exception=True):
            user.save()
            return Response(data=user.data, status=status.HTTP_200_OK)
    except:
            return Response("Failed to create user", status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
def user_login(request: Request):
    
    try:
        email = request.data['email']
        password = request.data['password'] 
        user = authenticate(email=email, password=password)
        if not user:
            return Response("Email or password is wrong", status=status.HTTP_404_NOT_FOUND)

        user = AppUserSerializer(user)
        return Response(data=user.data, status=status.HTTP_200_OK)
    except:
        return Response("User not found", status=status.HTTP_404_NOT_FOUND)
    
