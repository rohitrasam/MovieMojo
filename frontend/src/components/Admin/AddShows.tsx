import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,Typography,Card,CardContent,Breadcrumbs,Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow, Paper,IconButton,Link,CircularProgress,FormControl,InputLabel,MenuItem,Select,
  Alert,Grid,Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Movie {
  id: number;
  name: string;
  desc: string;
  duration: number;
  rating: number;
  release_date: string;
  theatreName: string;
  cityName: string;
}

interface Theatre {
  id: number;
  name: string;
  city: City;
  address: string;
}
interface City {
  id: number;
  name: string;
}

interface Screen{
id:number;
name:string

}

const AddShows = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre>();
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [selectedScreen, setSelectedScreen] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const[filteredTheatres,setfilteredTheatres]=useState<Theatre[]>([]);
  const[filteredScreens,setfilteredScreens]=useState<[]>([]);
  const[selectedDateTime,setSelectedDateTime]=useState<string>("");

  useEffect(() => {
    const fetchCitiesAndTheatres = async () => {
      try {
        const citiesResponse = await axios.get("http://localhost:8000/theatre/get_cities");
        const theatresResponse = await axios.get("http://localhost:8000/theatre/get_theatres");
        const moviesResponse = await axios.get("http://localhost:8000/movies/get_movies");
        const screenResponse = await axios.get("http://localhost:8000/screen/get_screens");
        
        setCities(citiesResponse.data);
        setTheatres(theatresResponse.data);
        setScreens(screenResponse.data);
        console.log(screenResponse.data);
        
        console.log(theatresResponse);
        setAllMovies(moviesResponse.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCitiesAndTheatres();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      console.log("Line 70");
      
      const fetchScreens = async () => {
        try {
          setfilteredTheatres(theatres.filter((theatre) => theatre.city.name === selectedCity))
          setfilteredScreens(screens.filter((screen)=>(screen.theatre.name==selectedTheatre.name && 
                                                        screen.theatre.city.name==selectedCity && 
                                                        screen.theatre.address === selectedTheatre.address)))
        } catch (error) {
          console.error("Error fetching screens:", error);
          setError("Failed to fetch movies. Please try again later.");
        }
      };

      fetchScreens();
    }
  }, [selectedCity,theatres,selectedTheatre,screens]);

  const handleAddMovie = async () => {
    if (!selectedMovie || !selectedCity || !selectedTheatre) {
      alert("Please select a movie, city, and theatre.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/show/add_show", {
        city: selectedCity,
        theatre: selectedTheatre.name,
        address: selectedTheatre.address,
        screen:selectedScreen,
        movie: selectedMovie,
        datetime:selectedDateTime.split("T")
      
        
      });
      alert("Show Added Successfully");
    } catch (error) {
      alert("Could not add show")
      console.error("Error adding show", error);
    }
  };

  // const handleDelete = async (id: number) => {
  //   if (!id) {
  //     alert("Invalid movie ID.");
  //     return;
  //   }

  //   if (window.confirm("Do you really want to delete this movie?")) {
  //     try {
  //       await axios.delete(`http://localhost:8000/movies/delete/${id}`);
  //       alert("Movie deleted successfully");
  //       setMovies(movies.filter((movie) => movie.id !== id));
  //     } catch (error) {
  //       console.error("Error deleting movie:", error);
  //     }
  //   }
  // };

  

  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Add Shows</Typography>
      </Breadcrumbs>

      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Add Shows
          </Typography>

          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={3} style={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select City</InputLabel>
                <Select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedTheatre("");
                  }}
                  label="Select City"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {cities.length > 0 &&
                    cities.map((city) => (
                      <MenuItem key={city.id} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth disabled={!selectedCity}>
                <InputLabel>Select Theatre</InputLabel>
                <Select
                  value={selectedTheatre}
                  onChange={(e) => setSelectedTheatre(e.target.value)}
                  label="Select Theatre"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {filteredTheatres.length > 0 &&
                    filteredTheatres.map((theatre) => (
                      <MenuItem key={theatre.id} value={theatre}>
                        {theatre.name + "," +theatre.address}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth disabled={!selectedTheatre}>
                <InputLabel>Select Screen</InputLabel>
                <Select
                  value={selectedScreen}
                  onChange={(e) => setSelectedScreen(e.target.value)}
                  label="Select Screen"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {filteredScreens.length > 0 &&
                    filteredScreens.map((screen) => (
                      <MenuItem key={screen.id} value={screen.name}>
                        {screen.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth disabled={!selectedScreen}>
                <InputLabel>Select Movie</InputLabel>
                <Select
                  value={selectedMovie}
                  onChange={(e) => setSelectedMovie(e.target.value)}
                  label="Select Movie"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {allMovies.length > 0 &&
                    allMovies.map((movie) => (
                      <MenuItem key={movie.id} value={movie.name}>
                        {movie.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
            <form>
              <TextField
                type="datetime-local"
                variant="outlined"
                label="Select Date And Time"
                fullWidth
                value={selectedDateTime}
                onChange={(e) => setSelectedDateTime(e.target.value)}
                disabled={!selectedMovie} 
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMovie}
            disabled={!selectedMovie || !selectedTheatre || !selectedCity || !selectedDateTime}
          >
            Add Show 
          </Button> 
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddShows;
