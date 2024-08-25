import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../core/models/Movie';

interface MovieTemplateProps {
  movie: Movie;
}

const MovieTemplate: React.FC<MovieTemplateProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/payment'); // Navigate to the payment page
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
        },
      }}
      onClick={handleCardClick} // Add onClick event to navigate
    >
      <CardMedia
        component="img"
        sx={{ width: '100%', height: 200 }}
        image={movie.posterUrl}
        alt={movie.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
        <CardContent>
          <Typography component="div" variant="h5">
            {movie.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {movie.release_date}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {movie.desc}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MovieTemplate;
