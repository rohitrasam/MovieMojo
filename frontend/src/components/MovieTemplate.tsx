import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Movie } from '../types';

interface MovieTemplateProps {
  movie: Movie;
}

const MovieTemplate: React.FC<MovieTemplateProps> = ({ movie }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        height: '150px',
        margin: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={movie.posterUrl}
        alt={movie.title}
      />
      <Box sx={{ display: 'flex'}}>
        <CardContent  sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <Typography fontFamily="Rubik" component="div" variant="h5">
            {movie.title}
          </Typography>
          <Typography fontFamily="Rubik" variant="subtitle1" color="text.secondary" component="div">
            {movie.releaseDate}
          </Typography>
          <Typography fontFamily="Rubik" variant="body2" color="text.secondary" component="div">
            {movie.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MovieTemplate;
