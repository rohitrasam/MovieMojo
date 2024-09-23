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
        const fetchedMovie = await getMovieById(Number(id));
        console.log(fetchMovie);
        setMovie(fetchedMovie);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h4">{movie.name}</Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: '10px' }}>
          {movie.genres.join(', ')}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          {movie.desc}
        </Typography>
        <Typography variant="body2">Rating: {movie.rating}</Typography>
        <Typography variant="body2">Release Date: {movie.release_date}</Typography>
        <Typography variant="body2">Duration: {movie.duration}</Typography>
        <Typography variant="body2">Languages: {movie.languages.join(', ')}</Typography>
        <Typography variant="body2">Cast: {movie.cast.join(', ')}</Typography>
        <Typography variant="body2">Formats: {movie.formats.join(', ')}</Typography>
      </Paper>
    </Box>
  );
};

export default MovieDetail;
