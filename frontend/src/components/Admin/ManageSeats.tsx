import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from "react-router-dom";
import { Box, MenuItem, Select, Typography, CircularProgress, Alert, Breadcrumbs, Card, 
        CardContent, Container, FormControl, Grid, InputLabel, Link, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import EventSeatIcon from '@mui/icons-material/EventSeat'
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

interface Screen{
  id:number;
  name:string;
  rows:number;
  cols:number
  theatre:Theatre;
}

const seatTypeColors = {
  Premium: 'gold',
  Gold: 'yellow',
  Silver: 'lightgray',
  Standard: 'dodgerblue'
};

const ManageSeats: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre>(null);
  const [selectedScreen, setSelectedScreen] = useState<Screen>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const[filteredTheatres,setfilteredTheatres]=useState<Theatre[]>([]);
  const[filteredScreens,setfilteredScreens]=useState<Screen[]>([]);
  const [assignedType, setAssignedType] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [rows, setRows] = useState<number>(0);
  const [cols, setColumns] = useState<number>(0);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesResponse = await axios.get('http://localhost:8000/theatre/get_cities');
        setCities(citiesResponse.data);
        const theatresResponse = await axios.get('http://localhost:8000/theatre/get_theatres');
        setTheatres(theatresResponse.data);
        const screenResponse = await axios.get('http://localhost:8000/screen/get_seats');
        setScreens(screenResponse.data);
        console.log(screenResponse.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      }finally {
        setLoading(false);
      }
    };
    fetchCities();
},[]);


useEffect(() => {
  if (selectedCity) {
    const fetchTheatre = async () => {
      try {
        setfilteredTheatres(theatres.filter((theatre) => theatre.city.name === selectedCity))
          setfilteredScreens(screens.filter((screen)=>(screen.theatre.name==selectedTheatre.name && 
                                                        screen.theatre.city.name==selectedCity && 
                                                        screen.theatre.address === selectedTheatre.address)))
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      }
    };

    fetchTheatre();
  }
}, [selectedCity,theatres,selectedTheatre,screens]);


useEffect(() => {
  const fetchSeatLayout = async () => {
   if(selectedScreen) {
      try {
        setRows(selectedScreen.rows);
        console.log(selectedScreen);
        
        setColumns(selectedScreen.cols);
      } catch (error) {
        console.error("Error fetching seat layout:", error);
        setError("Failed to fetch seat layout. Please try again.");
      }
    }
  };
  fetchSeatLayout();
}, [selectedScreen]);

useEffect(() => {
  setSeats(
    Array.from({ length: rows * cols }, (_, index) => {
      const rowIndex = Math.floor(index / cols) + 1;
      const colIndex = (index % cols) + 1;
      return {
        seat_num: `${rowIndex}${String.fromCharCode(64 + colIndex)}`, 
        _type: 'Standard', 
      };
    })
  );
}, [rows, cols]);



const handleSeatClick = (seatNum) => {
  setSelectedSeats((prev) =>
    prev.includes(seatNum) ? prev.filter(s => s !== seatNum) : [...prev, seatNum]
  );
};

const handleAssignType = async () => {
  if (assignedType) {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        selectedSeats.includes(seat.seat_num)
          ? { ...seat, _type: assignedType }
          : seat
      )
    );

    try {
      for (const seatNum of selectedSeats) {
        await axios.patch('http://localhost:8000/screen/update_seats', {
          city: selectedCity,
          theatre: selectedTheatre,
          name: selectedScreen.name,
          seats:{
            seat_num: seatNum,
            _type: assignedType
        }
        });
      }

      console.log('Seats updated successfully');
    } catch (error) {
      console.error('Error updating seats');
    }
  }
};


  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Manage Seats</Typography>
      </Breadcrumbs>

      <Card sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
    //   '&::-webkit-scrollbar': {
    //   display: 'none',
    // }
  }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Manage Seats
          </Typography>

          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={3} style={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select City</InputLabel>
                <Select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedTheatre("");
                  }}
                  label="Select City"
                >
                  <MenuItem value="">
                  </MenuItem>
                  {cities.length > 0 &&
                    cities.map((city) => (
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
                    setSelectedScreen();
                  }}
                  label="Select Theatre"
                >
                  <MenuItem value="">
                  </MenuItem>
                  {filteredTheatres.length > 0 &&
                    filteredTheatres.map((theatre) => (
                      <MenuItem key={theatre.id} value={theatre}>
                        {theatre.name},{theatre.address}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth disabled={!selectedTheatre}>
                <InputLabel>Select Screen</InputLabel>
                <Select
                  value={selectedScreen}
                  onChange={(e) => setSelectedScreen(e.target.value)}
                  label="Select Screen"
                >
                  {filteredScreens.length > 0 &&
                    filteredScreens.map((screen,idx) => (
                      <MenuItem key={idx} value={screen}>
                        {screen.name} 
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            
          </Grid>
          <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        overflow:'auto'
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Select Your Seats
      </Typography>

      {/* Seat Layout based on rows, cols, and fetched seats */}
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
                    : seatTypeColors[seat._type] || 'dodgerblue',
                }}
              />
              ))}
      </Box>

      {/* Seat Type Selection */}
      <Typography variant="h6" sx={{ mb: 2 }}>Select Seat Type</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        {Object.keys(seatTypeColors).map((type) => (
          <Button
            key={type}
            variant={assignedType === type ? 'contained' : 'outlined'}
            onClick={() => setAssignedType(type)}
            sx={{ mr: 1 }}
          >
            {type}
          </Button>
        ))}
      </Box>

      {/* Assign Seat Type Button */}
      <Button variant="contained" color="primary" onClick={handleAssignType} disabled={!assignedType || selectedSeats.length === 0}>
        Assign {assignedType} Type
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        {Object.entries(seatTypeColors).map(([type, color]) => (
          <Box key={type} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <EventSeatIcon sx={{ fontSize: '30px', color: color, mr: 1 }} />
            <Typography variant="body1">{type}</Typography>
          </Box>
        ))}

    </Box>
    </Box>
    </CardContent>
      </Card>
    </Container>
  );
};

export default ManageSeats;