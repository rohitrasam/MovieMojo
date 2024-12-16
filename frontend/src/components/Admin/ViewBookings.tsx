import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from "react-router-dom";
import { Box, MenuItem, Select, Typography, CircularProgress, Alert, Breadcrumbs, Card, 
        CardContent, Container, FormControl, Grid, InputLabel, Link, Button, 
        TableContainer,
        IconButton,
        Paper,
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableRow,
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        TextField} from '@mui/material';
import { useParams } from 'react-router-dom';
import EventSeatIcon from '@mui/icons-material/EventSeat';

interface City {
  id: number;
  name: string;
}

interface Theatre {
  id: number;
  name: string;
  address: string;
  city: City;
}

interface Screen {
  id: number;
  name: string;
  rows: number;
  cols: number;
  theatre: Theatre;
  seats: { seat_num: string, _type: string }[]; 
}

interface Show {
    id: number;
    movie: {
      id: number;
      name: string;
      desc: string;
      rating: number;
      release_date: string;
    };
    screen: {
      id:number;
      name: string;
      rows:number;
      cols:number;
      theatre: {
        name: string;
        city: {
          name: string;
        };
      };
    };
    time: string;
  }
  

const ViewBookings: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null);
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredTheatres, setFilteredTheatres] = useState<Theatre[]>([]);
  const [filteredScreens, setFilteredScreens] = useState<Screen[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [filteredShows, setFilteredShows] = useState<Show[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesResponse = await axios.get('http://localhost:8000/theatre/get_cities');
        setCities(citiesResponse.data);
        const theatresResponse = await axios.get('http://localhost:8000/theatre/get_theatres');
        setTheatres(theatresResponse.data);
        const screenResponse = await axios.get('http://localhost:8000/screen/get_screens');
        setScreens(screenResponse.data);
        const showsResponse=await  axios.get("http://localhost:8000/show/get_admin_shows");
        setShows(showsResponse.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setFilteredTheatres(theatres.filter((theatre) => theatre.city.name === selectedCity));
    }
  }, [selectedCity, theatres]);

  useEffect(() => {
    if (selectedCity && selectedTheatre) {
      setFilteredScreens(screens.filter(
        (screen) =>
          screen.theatre.name === selectedTheatre.name &&
          screen.theatre.city.name === selectedCity &&
          screen.theatre.address === selectedTheatre.address
      ));
    }
  }, [selectedCity, selectedTheatre, screens]);

  useEffect(() => {
    if (selectedCity && selectedTheatre && selectedScreen) {
      setFilteredShows(shows.filter(
        (show) =>
          show.screen.theatre.name === selectedTheatre.name && 
          show.screen.theatre.city.name === selectedCity && 
          show.screen.theatre.address === selectedTheatre.address &&
          show.screen.name === selectedScreen.name
      ));
    }
  }, [selectedCity, selectedTheatre,selectedScreen, shows]);

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">View Bookings</Typography>
      </Breadcrumbs>

      <Card sx={{ height: '100vh', overflow: 'scroll', padding: 4 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            View Bookings
          </Typography>

          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select City</InputLabel>
                <Select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedTheatre(null);
                    setSelectedScreen(null);
                  }}
                  label="Select City"
                >
                  <MenuItem value="">Select a city</MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth disabled={!selectedCity}>
                <InputLabel>Select Theatre</InputLabel>
                <Select
                  value={selectedTheatre}
                  onChange={(e) => {
                    setSelectedTheatre(e.target.value);
                    setSelectedScreen(null);
                  }}
                  label="Select Theatre"
                >
                  {filteredTheatres.map((theatre) => (
                    <MenuItem key={theatre.id} value={theatre}>
                      {theatre.name}, {theatre.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth disabled={!selectedTheatre}>
                <InputLabel>Select Screen</InputLabel>
                <Select
                  value={selectedScreen || ""}
                  onChange={(e) => setSelectedScreen(e.target.value)}
                  label="Select Screen"
                >
                  {filteredScreens.map((screen) => (
                    <MenuItem key={screen.id} value={screen}>
                      {screen.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {filteredShows.length === 0 && !loading && selectedScreen && (
            <Typography variant="body1">No shows available for the selected filters.</Typography>
          )}

            {filteredShows.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No</TableCell>
                    <TableCell>Movie Name</TableCell>
                    <TableCell>Date-Time</TableCell>
                    <TableCell>Total Seats</TableCell>
                    <TableCell>Booked Seats</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredShows.map((show, index) => (
                    <TableRow key={show.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{show.movie.name}</TableCell>
                      <TableCell>
                        {new Date(show.time).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                        </TableCell>
                        <TableCell>{show.screen.rows * show.screen.cols}</TableCell>
                        <TableCell>{show.bookings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ViewBookings;
