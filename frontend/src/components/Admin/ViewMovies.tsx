import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Link,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert,
  Grid,
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
  city: string;
}

interface City {
  id: number;
  name: string;
}

const ManageAndViewMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTheatre, setSelectedTheatre] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCitiesAndTheatres = async () => {
      try {
        const citiesResponse = await axios.get("http://localhost:8000/cities"); // Adjust API endpoint
        const theatresResponse = await axios.get("http://localhost:8000/theatre/get_theares");
        
        setCities(citiesResponse.data); // Assuming response is an array of cities
        setTheatres(theatresResponse.data.theatres); // Assuming response structure
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
      // Fetch movies based on the selected city and theatre
      const fetchMovies = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/movies/get_movies?city=${selectedCity}&theatre=${selectedTheatre}`);
          setMovies(response.data); 
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError("Failed to fetch movies. Please try again later.");
        }
      };

      fetchMovies();
    }
  }, [selectedCity, selectedTheatre]); 

  const handleDelete = async (id: number) => {
    if (!id) {
      alert("Invalid movie ID.");
      return;
    }

    if (window.confirm("Do you really want to delete this movie?")) {
      try {
        await axios.delete(`http://localhost:8000/movies/delete/${id}`);
        alert("Movie deleted successfully");
        setMovies(movies.filter(movie => movie.id !== id)); 
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  const filteredTheatres = theatres.filter(theatre => theatre.city === selectedCity);

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
          
          <Grid container spacing={3} style={{ marginBottom: '20px' }}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Select City</InputLabel>
                <Select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedTheatre(""); 
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {cities.length > 0 && cities.map(city => (
                    <MenuItem key={city.id} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={!selectedCity}>
                <InputLabel>Select Theatre</InputLabel>
                <Select
                  value={selectedTheatre}
                  onChange={(e) => setSelectedTheatre(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {filteredTheatres.length > 0 && filteredTheatres.map(theatre => (
                    <MenuItem key={theatre.id} value={theatre.name}>
                      {theatre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {movies.length === 0 && !loading && (
            <Typography variant="body1">No movies available for the selected filters.</Typography>
          )}

          {movies.length > 0 && (
            <TableContainer component={Paper}>
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
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movies.map((movie, index) => (
                    <TableRow key={movie.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{movie.name}</TableCell>
                      <TableCell>{movie.desc}</TableCell>
                      <TableCell>{movie.duration}</TableCell>
                      <TableCell>{movie.rating}</TableCell>
                      <TableCell>{new Date(movie.release_date).toLocaleDateString()}</TableCell>
                      <TableCell>{movie.theatreName}</TableCell>
                      <TableCell>{movie.cityName}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => window.location.href = `/edit-movie/${movie.id}`} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(movie.id)} color="secondary">
                          <DeleteIcon />
                        </IconButton>
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

export default ManageAndViewMovies;
