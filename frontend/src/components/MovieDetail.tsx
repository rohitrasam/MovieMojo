import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../core/models/Movie';
import { getMovieById } from '../core/services/movieService';
import { Box, Typography, Paper } from '@mui/material';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get movie ID from URL
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const fetchedMovie = await getMovieById(id);
        setMovie(fetchedMovie);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        backgroundImage: `url(${movie.poster_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '90%', // Increase the width to make the box larger
          maxWidth: '1200px', // Allow the box to grow more on large screens
          padding: '40px', // Increase padding for better spacing
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '15px', // Increase border radius for a more prominent effect
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          {movie.name}
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', color: '#555' }}>
          Genres: {movie.genres.map((g) => g._type).join(', ')}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: '1.2rem' }}>
          {movie.desc}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: '500' }}>
          Rating: {movie.rating}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: '500' }}>
          Release Date: {movie.release_date}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: '500' }}>
          Duration: {movie.duration}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: '500' }}>
          Languages: {movie.languages.map((lang) => lang.name).join(', ')}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', fontWeight: '500' }}>
          Formats: {movie.formats.map((format) => format._type).join(', ')}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MovieDetail;
