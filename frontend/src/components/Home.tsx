import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import MovieTemplate from './MovieTemplate';
import { Movie } from '../types';
const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    // Example hardcoded movie data
    const movieData: Movie[] = [
      { id: '1', title: 'Deadpool', description: 'Action', releaseDate: '2024', posterUrl: './src/assets/deedpool.jpg' },
      { id: '2', title: 'Kill', description: 'Action and Romantic', releaseDate: '2024', posterUrl: './src/assets/kill.jpg' },
      { id: '3', title: 'Phir Aayi Hasseen Dillruba', description: 'Drama and Romantic', releaseDate: '2024', posterUrl: './src/assets/phiraayi.jpg' },
      { id: '4', title: 'Rayaan', description: 'Action', releaseDate: '2024', posterUrl: './src/assets/rayan.jpg' },
      { id: '5', title: 'Bad News', description: 'Drama', releaseDate: '2024', posterUrl: './src/assets/bad news.jpg' },
      { id: '6', title: 'Maharaja', description: 'Story ', releaseDate: '2024', posterUrl: './src/assets/maharaja.jpg' },
      { id: '7', title: 'kalki', description: 'Action', releaseDate: '2024', posterUrl: './src/assets/kalki.jpg' },
      { id: '8', title: 'Vedaa', description: 'Story and Action', releaseDate: '2024', posterUrl: './src/assets/vedaa.jpg' },
      { id: '9', title: 'Munja', description: 'Horoor', releaseDate: '2024', posterUrl: './src/assets/munja.jpg' },
      { id: '10', title: 'Stree', description: 'Romantic and Darma', releaseDate: '2024', posterUrl: './src/assets/stree.jpg' },
    ];

    setMovies(movieData);
  }, []);

  const handleSearch = (query: string) => {
    // Implement search functionality here, filtering movies based on the query
    const filteredMovies = movieData.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  return (
    <Box sx={{ flex: 1, padding: 3 }}>
      <SearchBar onSearch={handleSearch} sx={{ marginBottom: 3 }} />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Top 10 Movies
      </Typography>
      <Grid container spacing={0.1}>
        {movies.slice(0, 10).map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieTemplate movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
