import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../core/models/Movie';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface MovieTemplateProps {
  movie: Movie;
}

const MovieTemplate: React.FC<MovieTemplateProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to movie detail page
  };

  return (
    <Card
      sx={{
        width: '350px', // Increased card width
        margin: 2,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="300" // Adjusted height for a larger image display
        image={movie.poster_url}
        alt={movie.name}
        loading="lazy"
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="div" noWrap>
          {movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.genres?.length > 0 ? movie.genres.map(g => g._type).join(', ') : 'No genres available'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieTemplate;
