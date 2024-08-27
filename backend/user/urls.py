from django.urls import path
from .views import *


urlpatterns = [

    path("signup", user_signup, name="user-signup"),
    path("login", user_login, name="user-login"),
    path("reset_password", reset_password, name="reset-password"),

]