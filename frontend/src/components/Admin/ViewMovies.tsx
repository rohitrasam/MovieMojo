import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,Typography,Card,CardContent,Breadcrumbs,Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow, Paper,IconButton,Link,CircularProgress,FormControl,InputLabel,MenuItem,Select,
  Alert,Grid,Button,
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
}
interface City {
  id: number;
  name: string;
}

const ViewMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTheatre, setSelectedTheatre] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const[filteredTheatres,setfilteredTheatres]=useState<Theatre[]>([]);
  const[shows,setShows]=useState<[]>([]);
  const[filteredShows,setfilteredShows]=useState<[]>([])

  useEffect(() => {
    const fetchCitiesAndTheatres = async () => {
      try {
        const citiesResponse = await axios.get("http://localhost:8000/theatre/get_cities");
        const theatresResponse = await axios.get("http://localhost:8000/theatre/get_theatres");
        const moviesResponse = await axios.get("http://localhost:8000/movies/get_movies");
        const response = await axios.get("http://localhost:8000/theatre/get_shows");
        console.log(response.data);
        
        setCities(citiesResponse.data);
        setTheatres(theatresResponse.data);
        console.log(theatresResponse);
        setShows(response.data);
        
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
      
      const fetchMovies = async () => {
        try {
          setfilteredTheatres(theatres.filter((theatre) => theatre.city.name === selectedCity))
          setfilteredShows(shows.filter((show)=>(show.theatre.name==selectedTheatre && show.theatre.city.name==selectedCity)))
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError("Failed to fetch movies. Please try again later.");
        }
      };

      fetchMovies();
    }
  }, [selectedCity,theatres,selectedTheatre,shows]);

  const handleAddMovie = async () => {
    if (!selectedMovie || !selectedCity || !selectedTheatre) {
      alert("Please select a movie, city, and theatre.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/theatre/add_show", {
        movie: selectedMovie,
        city: selectedCity,
        theatre: selectedTheatre,
      });
      alert("Movie added successfully to the theatre.");
    } catch (error) {
      console.error("Error adding movie to theatre:", error);
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
        <Typography color="textPrimary">Manage and View Movies</Typography>
      </Breadcrumbs>

      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Manage and View Movies
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
                      <MenuItem key={theatre.id} value={theatre.name}>
                        {theatre.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth disabled={!selectedTheatre}>
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
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMovie}
            disabled={!selectedMovie || !selectedTheatre || !selectedCity}
          >
            Add Movie to Theatre
          </Button>

          {filteredShows.length === 0 && !loading && (
            <Typography variant="body1">No movies available for the selected filters.</Typography>
          )}

          {filteredShows.length > 0 && (
            <TableContainer component={Paper} maxWidth="md" sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
              '&::-webkit-scrollbar': {
              display: 'none',
            }
            }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No</TableCell>
                    <TableCell>Movie Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Release Date</TableCell>
                    <TableCell>Theatre Name</TableCell>
                    <TableCell>City Name</TableCell>
                    <TableCell>Address</TableCell>
                    {/* <TableCell>Actions</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredShows.map((show, index) => (
                    <TableRow key={show.movie.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{show.movie.name}</TableCell>
                      <TableCell>{show.movie.desc}</TableCell>
                      <TableCell>{show.movie.duration}</TableCell>
                      <TableCell>{show.movie.rating}</TableCell>
                      <TableCell>{new Date(show.movie.release_date).toLocaleDateString()}</TableCell>
                      <TableCell>{show.theatre.name}</TableCell>
                      <TableCell>{show.theatre.city.name}</TableCell>
                      <TableCell>{show.theatre.address}</TableCell>
                      <TableCell>
                        {/* <IconButton onClick={() => window.location.href = `/edit-movie/${show.movie.id}`} color="primary">
                          <EditIcon />
                        </IconButton> */}
                        {/* <IconButton onClick={() => handleDelete(show.movie.id)} color="secondary">
                          <DeleteIcon />
                        </IconButton> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ViewMovies;
