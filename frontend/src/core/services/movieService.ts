import axios from "axios";
import { Movie } from "../models/Movie";

// API base URL
const API_URL = "http://127.0.0.1:8000/movies"; // Your backend API URL

// Fetch all movies
export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get<Movie[]>(`${API_URL}/get_movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Fetch a single movie by ID
export const getMovieById = async (id: number): Promise<Movie> => {
  try {
    const response = await axios.get<Movie>(`${API_URL}/get_movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};
