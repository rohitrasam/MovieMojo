import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import AdminBar from './AdminBar';
import { Container, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, MenuItem, Select, FormControl, InputLabel, Grid, Alert, Link, Breadcrumbs } from '@mui/material';
import "./AdminDashboard.css";
import { Link as RouterLink } from "react-router-dom";

interface Movie {
  city: string;
  theatre: string;
  id: number;
  name: string;
  desc: string;
  rating: number;
  duration: string;
}

interface Theatre {
  id: number;
  name: string;
  city: string;
}

const ViewMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedTheatre, setSelectedTheatre] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoviesAndTheatres = async () => {
      try {
        const moviesResponse = await axios.get<{ movies: Movie[] }>('http://localhost:8000/movies');
        const theatresResponse = await axios.get<{ theatres: Theatre[] }>('http://localhost:8000/theatres');
        
        setMovies(moviesResponse.data.movies);
        setTheatres(theatresResponse.data.theatres);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesAndTheatres();
  }, []);

  const filteredMovies = movies.filter(movie => {
    return (
      (selectedCity ? movie.city === selectedCity : true) &&
      (selectedTheatre ? movie.theatre === selectedTheatre : true)
    );
  });

  return (
    <Container maxWidth="lg">
     <Breadcrumbs aria-label="breadcrumb">
                        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
                        <Typography color="textPrimary">Add Theatre</Typography>
                    </Breadcrumbs>
      <Typography variant="h4" component="h1" gutterBottom>
        Movie Details
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select City</InputLabel>
            <Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {theatres.map(theatre => (
                <MenuItem key={theatre.id} value={theatre.city}>
                  {theatre.city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select Theatre</InputLabel>
            <Select
              value={selectedTheatre}
              onChange={(e) => setSelectedTheatre(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {theatres.map(theatre => (
                <MenuItem key={theatre.id} value={theatre.name}>
                  {theatre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {filteredMovies.length === 0 && !loading && (
        <Typography variant="body1">No movies available for the selected filters.</Typography>
      )}

      {filteredMovies.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Movie Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMovies.map((movie, index) => (
                <TableRow key={movie.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{movie.name}</TableCell>
                  <TableCell>{movie.desc}</TableCell>
                  <TableCell>{movie.rating}</TableCell>
                  <TableCell>{movie.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ViewMovies;
