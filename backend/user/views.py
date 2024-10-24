from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from models.models import AppUser
from .serializers import AppUserSerializer
from rest_framework import status
from django.contrib.auth import authenticate


@api_view(['POST'])
def user_signup(request: Request) -> Response:
    try:
        print (request.data)
        if AppUser.objects.filter(email=request.data['email']).exists():
            return Response("User already exists.", status=status.HTTP_409_CONFLICT)

        user = AppUserSerializer(data=request.data)
        if user.is_valid(raise_exception=True):
            user.save()
            return Response(data=user.data, status=status.HTTP_200_OK)  # TODO: return success message
    except:
            return Response("Failed to create user", status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
def user_login(request: Request) -> Response:

    """
        Simple login function, will further improve to be able to send auth tokens to make it more secure
    """
    
    try:
        email = request.data['email']
        password = request.data['password'] 
        user = authenticate(email=email, password=password)
        if not user:
            return Response("Email or password is wrong", status=status.HTTP_404_NOT_FOUND)

        user = AppUserSerializer(user)
        # response = Response(data=user.data, status=status.HTTP_200_OK)  # TODO: return JWT token
        # response.set_cookie(key="details", value=user.data, httponly=True)
        return Response(data=user.data, status=status.HTTP_200_OK)  # TODO: return JWT token
    except:
        return Response("User not found", status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
def reset_password(request: Request) -> Response:

    """
        Simple reset password functionality, will update the function to make it more complex and secure
    """

    try:
        user = AppUser.objects.filter(email=request.data['email']).first()
        if not user:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)
        
        user.set_password(request.data['password'])
        user.save()
        return Response("Password reset successfully", status=status.HTTP_200_OK)
    except:
        return Response("Could not reset password", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_total_users(request: Request) -> Response:
    try:
        total_users = len(AppUser.objects.filter(isAdmin=0))
        return Response({"total_users": total_users}, status=status.HTTP_200_OK)
    except:
        return Response("Unable to get total users.", status=status.HTTP_400_BAD_REQUEST)
