import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from "react-router-dom";
import { Box, MenuItem, Select, Typography, CircularProgress, Alert, Breadcrumbs, Card, 
        CardContent, Container, FormControl, Grid, InputLabel, Link, Button } from '@mui/material';
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
  seats: { seat_num: string, _type: string }[]; // Updated to reflect seats with seat numbers and types
}

const seatTypeColors = {
  Premium: 'gold',
  Gold: 'yellow',
  Silver: 'gray',
  Standard: 'dodgerblue'
};

const seatPrice = {
  Premium: 750,
  Gold: 450,
  Silver: 350,
  Standard: 200
};

const ManageSeats: React.FC = () => {
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
  const [assignedType, setAssignedType] = useState<string | null>(null);
  const [assignedPrice, setAssignedPrice] = useState<number| null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [rows, setRows] = useState<number>(0);
  const [cols, setColumns] = useState<number>(0);
  const [seats, setSeats] = useState<{ seat_num: string, _type: string }[]>([]);
  const [seatPrices, setSeatPrices] = useState<{ [key: string]: number }>({});


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesResponse = await axios.get('http://localhost:8000/theatre/get_cities');
        setCities(citiesResponse.data);
        const theatresResponse = await axios.get('http://localhost:8000/theatre/get_theatres');
        setTheatres(theatresResponse.data);
        const screenResponse = await axios.get('http://localhost:8000/screen/get_seats');
        setScreens(screenResponse.data);
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
          screen.theatre.city.name === selectedCity
      ));
    }
  }, [selectedCity, selectedTheatre, screens]);

  useEffect(() => {
    if (selectedScreen) {
      setRows(selectedScreen.rows);
      setColumns(selectedScreen.cols);
      setSeats(selectedScreen.seats); // Fetch seats for selected screen
      console.log(selectedScreen.seats);
      
    }
  }, [selectedScreen]);

  const handleSeatClick = (seatNum: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNum) ? prev.filter(s => s !== seatNum) : [...prev, seatNum]
    );
  };

  const handleAssignType = async () => {
    if (assignedType) {
      const updatedSeats = seats.map((seat) =>
        selectedSeats.includes(seat.seat_num)
          ? { ...seat, _type: assignedType ,price:assignedPrice}
          : seat
      );
      setSeats(updatedSeats);

      try {
        await Promise.all(
          selectedSeats.map((seatNum) =>
            axios.patch('http://localhost:8000/screen/update_seats', {
              city: selectedCity,
              theatre: selectedTheatre,
              name: selectedScreen?.name,
              seats: {
                seat_num: seatNum,
                _type: assignedType,
                price:assignedPrice
              },
            })
          )
        );
        console.log('Seats updated successfully');
      } catch (error) {
        console.error('Error updating seats:', error);
        setError('Failed to update seats on the server.');
      } finally {
        setSelectedSeats([]);
        setAssignedType(null);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Manage Seats</Typography>
      </Breadcrumbs>

      <Card sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Manage Seats
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
                  value={selectedScreen || ''}
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

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Select Your Seats
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: '10px',
                mb: 4,
              }}
            >
              {seats.map((seat) => (
                <EventSeatIcon
                  key={seat.seat_num}
                  onClick={() => handleSeatClick(seat.seat_num)}
                  sx={{
                    fontSize: '40px',
                    cursor: 'pointer',
                    color: selectedSeats.includes(seat.seat_num)
                      ? 'gray'
                      : seatTypeColors[seat._type] || 'lightgray',
                  }}
                />
              ))}
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>Select Seat Type</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              {Object.keys(seatTypeColors).map((type) => (
                <Button
                  key={type}
                  variant={assignedType === type ? 'contained' : 'outlined'}
                  onClick={() => {setAssignedType(type)
                    setAssignedPrice(seatPrice[type])
                  }}
                  sx={{ mr: 1 }}
                >
                  {type} : Rs.{seatPrice[type]}
                </Button>
              ))}
            </Box>

            <Button variant="contained" color="primary" onClick={handleAssignType} disabled={!assignedType || selectedSeats.length === 0}>
              Assign {assignedType} Type
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Container>
  );
};

export default ManageSeats;
