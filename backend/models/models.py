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
    poster_url = models.TextField(blank=True, null=True)

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

    # class CITIES(models.TextChoices):
    #     PUNE = "Pune"
    #     MUMBAI = "Mumbai"
    #     DELHI = "Delhi"
    #     BENGALURU = "Bengaluru"
    #     AHMEDABAD = "Ahmedabad"
    #     KOLKATA = "Kolkata"

    name = models.CharField(max_length=25, default=None, unique=True)

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
    

class Theatre(models.Model):

    name = models.CharField(max_length=50)
    address = models.TextField()
    city = models.ForeignKey(City, related_name="theatre_city", on_delete=models.CASCADE)
    # screen_count = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f'{self.name}, {self.city}'
    
    @property
    def screen_count(self):
        return len(self.screen_theatre.all())


class Screen(models.Model):

    name = models.CharField(max_length=30)
    rows = models.IntegerField()
    cols = models.IntegerField()
    theatre = models.ForeignKey(Theatre, related_name='screen_theatre', on_delete=models.CASCADE)
    # isFull = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.name}, {self.rows}, {self.cols}'


class Seat(models.Model):

    _type = models.CharField(max_length=30, null=True)
    seat_num = models.CharField(max_length=10)
    price = models.FloatField(default=0.0)
    screen = models.ForeignKey(Screen, related_name='seat_screen', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.seat_num}, {self._type}'


class Show(models.Model):

    screen = models.ForeignKey(Screen, related_name='show_screen', on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, related_name='show_movie', on_delete=models.CASCADE)
    time = models.DateTimeField()

    def __str__(self) -> str:
        return f'{self.movie}, {self.screen}, {self.time}'


class Booking(models.Model):

    """ Not working as expected. Make changes. """

    show = models.ForeignKey(Show, related_name='booking_show', on_delete=models.CASCADE)     
    user = models.ForeignKey(AppUser, related_name='booking_user', on_delete=models.CASCADE)
    seat = models.ForeignKey(Seat, related_name='booking_seat', on_delete=models.CASCADE)
    
    @property
    def price(self):
        return sum(map(lambda booking: booking.seat.price, Booking.objects.filter(seat=self.seat)))

    def __str__(self) -> str:
        return f"{self.user}, {self.show}, {self.seat}"