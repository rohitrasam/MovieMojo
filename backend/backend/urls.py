from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('movies/', include('movie.urls')),
    path('theatre/', include('theatre.urls')),
    path('screen/', include('screen.urls')),
    path('show/', include('show.urls')),

]
