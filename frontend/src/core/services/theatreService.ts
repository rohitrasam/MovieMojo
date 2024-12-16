import axios from "axios";
import { City } from "../models/City";
// import { Theater } from "../models/Theater"; // Import the Theater model if you have it

// API base URL
const API_URL = "http://127.0.0.1:8000/"; // Your backend API URL

// Fetch all cities
export const getCities = async (): Promise<City[]> => {
  try {
    const response = await axios.get<City[]>(`${API_URL}theatre/get_cities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

// Fetch theaters by city and movie ID
export const getTheatersByCityAndMovie = async (
  // city: string,
  movie: string
): Promise<[]> => {
  try {
    const response = await axios.get<[]>(
      `${API_URL}show/get_booking_shows/${movie}`
    );
   
    return response.data;
  } catch (error) {
    console.error("Error fetching theaters:", error);
    throw error;
  }
};
