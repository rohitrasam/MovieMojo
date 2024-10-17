import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress, IconButton, Avatar } from '@mui/material';
import SearchBar from './SearchBar';
import MovieTemplate from './MovieTemplate';
import { Movie } from '../core/models/Movie';
import SideBar from './Sidebar/SideBar';
import { getMovies } from '../core/services/movieService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
        setFilteredMovies(data); // Initially set filtered movies to all movies
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = movies.filter(movie =>
        movie.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies); // Reset to original list if query is empty
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display={"flex"} sx={{ flex: 1 }}>
      <SideBar />
      <Box sx={{ overflowY: "scroll", height: "100vh", marginLeft: "10px", paddingLeft: "20px", width: "100%" }}>
        <Box display="flex" alignItems="center">
          <SearchBar onSearch={handleSearch} />
          <IconButton
            sx={{
              marginLeft: "20px",
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: "50%", // Make the button round
              '&:hover': {
                backgroundColor: "#115293",
              }
            }}
            onClick={() => navigate('/profile')} // Navigate to Profile page
          >
            <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>P</Avatar>
          </IconButton>
        </Box>
        <Typography variant="h4" sx={{ padding: "10px 0px 0px 10px", mb: 2 }}>
          Latest Releases
        </Typography>
        {filteredMovies.length === 0 && searchQuery ? (
          <Typography variant="h6" sx={{ padding: "10px" }}>
            No results found for "{searchQuery}".
          </Typography>
        ) : (
          <Grid container spacing={0.1}>
            {filteredMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <MovieTemplate movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Home;