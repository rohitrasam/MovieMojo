import axios from "axios";
import { Movie } from "../models/Movie";

// API base URL
const API_URL = "http://127.0.0.1:8000/";// backend API URL

// Fetch all movies
export const getMovies = async (): Promise => {
  try {
    const response = await axios.get(`${API_URL}/show/get_home_shows`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Fetch a single movie by ID
export const getMovieById = async (id: number): Promise<Movie> => {
  try {
    const response = await axios.get<Movie>(`${API_URL}/movies/get_movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};