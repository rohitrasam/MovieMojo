import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Movie } from '../core/models/Movie';
import { getMovieById } from '../core/services/movieService';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get movie ID from URL
  const navigate = useNavigate();
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

  // Function to handle the book ticket action
  const handleBookTicket = () => {
    navigate(`/movie/${id}/select-seat`, { state: { movieName: movie?.name } });
  };

  const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        backgroundImage: `url(${movie.posterUrl})`,
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
          width: '90%',
          maxWidth: '1200px',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '15px',
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
          Release Date: {formattedReleaseDate}
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

        {/* Book Ticket Button */}
        <Button variant="contained" color="primary" onClick={handleBookTicket}>
          Book Ticket
        </Button>
      </Paper>
    </Box>
  );
};

export default MovieDetail;
