import axios from 'axios';
import { Movie } from '../core/models/Movie';

const API_KEY = 'your_api_key';
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });

  return response.data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    releaseDate: movie.release_date,
    overview: movie.overview,
  }));
};
