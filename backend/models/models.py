from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class AppUserManager(BaseUserManager):
    def create_user(self, email: str, phone_no: str, password=None, **validated_data):
        if not email:
            raise ValueError("Email is required.")
        if not password:
            raise ValueError("Password is required.")
        
        email = self.normalize_email(email)
        user = self.model(**validated_data, email=email, phone_no=phone_no)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email: str, phone_no: str, password=None):
        if not email:
            raise ValueError("Email is required.")
        if not password:
            raise ValueError("Password is required.")
        
        user = self.create_superuser(email=email, phone_no=phone_no, password=password)
        user.is_superuser = True
        user.save()

        return user
    
    def create_admin(self, email: str, phone_no: str, password=None, **validated_data):
        if not email:
            raise ValueError("Email is required.")
        if not password:
            raise ValueError("Password is required.")
        
        user = self.create_user(email=email, phone_no=phone_no, password=password, **validated_data)

        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    
    email = models.EmailField(max_length=60, unique=True)
    first_name = models.CharField(max_length=30, null=True, blank=True)
    last_name = models.CharField(max_length=30, null=True, blank=True)
    phone_no = models.CharField(max_length=10, unique=True)
    isAdmin = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    isActive = models.BooleanField(default=True)
    objects = AppUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_no']
    
    def __str__(self) -> str:
        return f'{self.email}'


class Movie(models.Model):
    
    name = models.CharField(max_length=100, null=True)
    desc = models.TextField(blank=False)
    duration = models.FloatField(default=0.0)
    release_date = models.DateField(null=True)
    rating = models.FloatField(default=5.0)

    def __str__(self) -> str:
        return self.name


class Actor(models.Model):

    name = models.CharField(max_length=100, null=True)
    desc = models.TextField(blank=False)

    def __str__(self) -> str:
        return self.name


class Language(models.Model):

    name = models.CharField(max_length=25, unique=True)

    def __str__(self) -> str:
        return self.name


class Format(models.Model):

    _type = models.CharField(max_length=25, db_column="type")

    def __str__(self) -> str:
        return self._type


class Genre(models.Model):

    _type = models.CharField(max_length=25, db_column="type")

    def __str__(self) -> str:
        return self._type


class City(models.Model):

    class CITIES(models.TextChoices):
        PUNE = "Pune"
        MUMBAI = "Mumbai"
        DELHI = "Delhi"
        BENGALURU = "Bengaluru"
        AHMEDABAD = "Ahmedabad"
        KOLKATA = "Kolkata"

    name = models.CharField(max_length=25, choices=CITIES, default=None)

    def __str__(self) -> str:
        return self.name
    

class Cast(models.Model):
    
    movie = models.ForeignKey(Movie, related_name="cast_movie", on_delete=models.CASCADE)
    actor = models.ForeignKey(Actor, related_name="cast_actor", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.movie}, {self.actor}'
    

class MovieLanguage(models.Model):
    
    movie = models.ForeignKey(Movie, related_name="movie_language_movie", on_delete=models.CASCADE)
    language = models.ForeignKey(Language, related_name="movie_language_language", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.movie}, {self.language}'
    

class MovieFormat(models.Model):

    movie = models.ForeignKey(Movie, related_name="movie_format_movie", on_delete=models.CASCADE)
    _format =  models.ForeignKey(Format, related_name="movie_format_format", on_delete=models.CASCADE, db_column="format")

    def __str__(self) -> str:
        return f'{self.movie}, {self._format}'


class MovieGenre(models.Model):

    movie = models.ForeignKey(Movie, related_name="movie_genre_movie", on_delete=models.CASCADE)
    genre =  models.ForeignKey(Genre, related_name="movie_genre_genre", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.movie}, {self.genre}'