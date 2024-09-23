import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../core/models/Movie';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { getMovieById } from '../core/services/movieService';

interface MovieTemplateProps {
  movie: Movie;
}

const MovieTemplate: React.FC<MovieTemplateProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to movie detail page

  };

  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="140"
        image={movie.posterUrl} // Replace with actual movie poster URL
        alt={movie.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.genres.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieTemplate;
