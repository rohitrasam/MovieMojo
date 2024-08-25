import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import MovieTemplate from './MovieTemplate';
import { Movie } from '../core/models/Movie';
import SideBar from './Sidebar/SideBar';

// TODO: Move this file and Login file to pages

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    // Example hardcoded movie data
    const movieData: Movie[] = [
      { id: '1', name: 'Deadpool',desc: 'Action', release_date: '2024', posterUrl: './src/assets/deedpool.jpg' },
      { id: '2', name: 'Kill',desc: 'Action and Romantic', release_date: '2024', posterUrl: './src/assets/kill.jpg' },
      { id: '3', name: 'Phir Aayi Hasseen Dillruba',desc: 'Drama and Romantic', release_date: '2024', posterUrl: './src/assets/phiraayi.jpg' },
      { id: '4', name: 'Rayaan',desc: 'Action', release_date: '2024', posterUrl: './src/assets/rayan.jpg' },
      { id: '5', name: 'Bad News',desc: 'Drama', release_date: '2024', posterUrl: './src/assets/bad news.jpg' },
      { id: '6', name: 'Maharaja',desc: 'Story ', release_date: '2024', posterUrl: './src/assets/maharaja.jpg' },
      { id: '7', name: 'kalki',desc: 'Action', release_date: '2024', posterUrl: './src/assets/kalki.jpg' },
      { id: '8', name: 'Vedaa',desc: 'Story and Action', release_date: '2024', posterUrl: './src/assets/vedaa.jpg' },
      { id: '9', name: 'Munja',desc: 'Horoor', release_date: '2024', posterUrl: './src/assets/munja.jpg' },
      { id: '10', name: 'Stree',desc: 'Romantic and Darma', release_date: '2024', posterUrl: './src/assets/stree.jpg' },
    ];

    setMovies(movieData);
  }, []);

  const handleSearch = (query: string) => {
    // Implement search functionality here, filtering movies based on the query
    const filteredMovies = movies.filter(movie =>
      movie.name.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  return (

    <Box display={"flex"} sx={{ flex: 1}}>
      <div>
        <SideBar />
      </div>
      <div style={{ overflowY: "scroll", height: "100vh", marginLeft:"10px", paddingLeft: "20px", width: "100%"}}>

        <SearchBar onSearch={handleSearch} />
        <Typography variant="h4" sx={{ padding: "10px 0px 0px 10px", mb: 2 }}>
         Latest Releases
        </Typography>
        <Grid container spacing={0.1}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieTemplate movie={movie} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default Home;
