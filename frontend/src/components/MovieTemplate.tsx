import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../core/models/Movie';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { getMovieById } from '../core/services/movieService';

interface MovieTemplateProps {
  movie: Movie;
}

const MovieTemplate: React.FC<MovieTemplateProps> = ({ movie }) => {

  console.log(movie);
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to movie detail page

  };

  return (
    <Card
      sx={{
        display: 'flex',
        height: '150px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
        },
      }}
      onClick={handleClick} // Add onClick event to navigate
    >
      <CardMedia
        component="img"
        height="140"
        image={movie.poster_url} // Replace with actual movie poster URL
        alt={movie.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {movie.genres.map((g) => g._type).join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieTemplate;
