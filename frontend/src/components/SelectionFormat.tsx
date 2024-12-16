import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { getTheatersByCityAndMovie } from "../core/services/theatreService"; // Adjust import path as needed

interface Show {
  id: string; // Show ID used for navigation to Seat Selection
  time: string; // Timing of the show
  screen: {
    theatre: {
      name: string; // Theatre name
      city: {
        name: string; // City name
      };
    };
  };
}

const SelectionFormat: React.FC = () => {
  const { name: movie } = useParams<{ name: string }>(); // Movie name from URL
  const navigate = useNavigate(); // Used for navigation
  const [shows, setShows] = useState<Show[]>([]); // State for shows
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error messages
  const city = localStorage.getItem("city") || "City"; // Default city from localStorage

  // Fetch theaters and shows by city and movie
  useEffect(() => {
    const fetchTheaters = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching data for movie:", movie);
        const data = await getTheatersByCityAndMovie(movie || "");
        console.log("Fetched data:", data);

        // Filter shows by city (case-insensitive)
        const filteredShows = data.filter(
          (show) =>
            show.screen.theatre.city.name.toLowerCase() === city.toLowerCase()
        );
        console.log("Filtered shows:", filteredShows);

        if (filteredShows.length === 0) {
          throw new Error(
            `No shows available in ${city} for the movie "${movie}".`
          );
        }

        setShows(filteredShows);
      } catch (err: any) {
        console.error("Failed to fetch shows:", err);
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, [city, movie]);

  // Group shows by theater name
  const groupedShows = shows.reduce((acc, show) => {
    const theaterName = show.screen.theatre.name;
    if (!acc[theaterName]) {
      acc[theaterName] = [];
    }
    acc[theaterName].push({ id: show.screen.id, time: show.time });
    return acc;
  }, {} as Record<string, { id: string; time: string }[]>);

  // Handle click on timing button to navigate to Seat Selection
  const handleTimingClick = (showId: string) => {
    // console.log(showId);
    console.log(showId);

    navigate(`/seat-selection/${showId}`); // Navigate to Seat Selection page with Show ID
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading shows...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={() => window.location.reload()} // Reload the page
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!shows.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">
          No shows available in {city} for this movie.
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={4}>
      {/* Display Movie Name at the top */}
      <Typography variant="h3" gutterBottom align="center">
        {movie}
      </Typography>

      <Typography variant="h4" gutterBottom>
        Theatres in {city}
      </Typography>

      {/* List of Theaters */}
      <List>
        {Object.entries(groupedShows).map(([theaterName, timings]) => (
          <Paper key={theaterName} sx={{ marginBottom: 2, padding: 2 }}>
            {/* Theater Name */}
            <Typography variant="h5" gutterBottom>
              {theaterName}
            </Typography>

            {/* Show Timings in Button Format */}
            <List sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {timings.map((timing, index) => (
                <ListItem
                  key={index}
                  disableGutters
                  sx={{
                    width: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: "10px 20px",
                      textTransform: "none",
                    }}
                    onClick={() => handleTimingClick(timing.id)} // Navigate to Seat Selection
                  >
                    {new Date(timing.time).toLocaleString("en-US", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default SelectionFormat;
