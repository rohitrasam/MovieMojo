import axios from "axios";
import { City } from "../models/City";

// API base URL
const API_URL = "http://127.0.0.1:8000/theatre"; // Your backend API URL

// Fetch all movies
export const getCities = async (): Promise<City[]> => {
  try {
    const response = await axios.get<City[]>(`${API_URL}/get_cities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};