import React, { useEffect, useState } from "react";
import axios from 'axios';
import { TextField, Button, Container, Grid, Card, CardContent, Typography, Alert, Breadcrumbs, Link, InputLabel, FormControl, MenuItem, Select, Box } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";

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
    city:City;
    theatre:Theatre;
  }
  

const AddSeats: React.FC = () => {
    const [_type, setType] = useState('');
    const [seat_num, setNum] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const[theatre,setTheatres]=useState<Theatre[]>([]);
    const[cities,setCities]=useState<City[]>([]);
    const[screen,setScreen]=useState<Screen[]>([]);
    const[selectedScreen,setSelectedScreen]=useState<string>("");
    const[selectedTheatre,setSelectedTheatre]=useState<string>("");
    const[filteredTheatres,setfilteredTheatres]=useState<Theatre[]>([]);
    const[filteredScreen,setfilteredScreen]=useState<Screen[]>([]);
    const[selectedCity,setSelectedCity]=useState<string>("");
    

useEffect(()=>{
    const fetchCitiesAndTheatres = async () => {
        try {
        const citiesResponse = await axios.get("http://localhost:8000/theatre/get_cities");
        const theatresResponse = await axios.get("http://localhost:8000/theatre/get_theatres");
        const screenResponse = await axios.get("http://localhost:8000/theatre/get_screens");
          setCities(citiesResponse.data);
          console.log(citiesResponse.data);
          setTheatres(theatresResponse.data);
          setScreen(screenResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
       
        } 
      };
  
      fetchCitiesAndTheatres();
    }, [theatre,cities,screen]);
  

    useEffect(() => {
        if (selectedCity) {
          const fetchMovies = async () => {
            try {
              setfilteredTheatres(theatre.filter((theatre) => theatre.city.name === selectedCity))
              setfilteredScreen(screen.filter((screen)=>(screen.theatre.name==selectedTheatre && screen.theatre.city.name==selectedCity)))
            } catch (error) {
              console.error("Error fetching movies:", error);
            
            }
          };
    
          fetchMovies();
        }
      }, [selectedCity,theatre,selectedTheatre,screen,selectedScreen]);
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/theatre/add_seats", {  
                _type: _type,
                seat_num: seat_num,
                price: price,
                screen:screen

            });

            if (response.status === 200) {
                
                setSuccess("Screen has been added!");
                setType('');
                setNum('');
                setPrice('');  
            } else {
                setError("Something went wrong");
            }
        } catch (err) {
            setError("Please try again");
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link variant="h6" component={RouterLink} to="/admindashboard">Dashboard</Link>
                        <Typography variant="h6" color="textPrimary">Add Seat </Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ width: '750px', height:'450px',margin: '0 auto' }}>
                        <CardContent>
                            <Typography variant="h4" component="h2" align="center">
                                Add Seat
                            </Typography>
                            <Box mt={2}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Seat Type"
                                            fullWidth
                                            value={_type}
                                            onChange={(e) => setType(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label=" Seat Number"
                                            fullWidth
                                            value={seat_num}
                                            onChange={(e) => setNum(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Price"
                                            fullWidth
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
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
                                        {cities.length > 0 &&
                                        cities.map((city) => (
                                        <MenuItem key={city.id} value={city.name}>
                                            {city.name}
                                        </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Select Theatre</InputLabel>
                                        <Select
                                        value={selectedTheatre}
                                        onChange={(e) =>{
                                            setSelectedTheatre(e.target.value);
                                            setSelectedScreen("");
                                    }}
                                        label="Select Theatre"
                                        >
                                       { filteredTheatres.map((theatre)=>(
                                        <MenuItem key={theatre.id} value={theatre.name}>
                                            {theatre.name}
                                        </MenuItem>
                                       ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Select Screen</InputLabel>
                                        <Select
                                        value={selectedScreen}
                                        onChange={(e) => setSelectedScreen(e.target.value)}
                                        label="Select Screen"
                                        >
                                       { filteredScreen.map((screen)=>(
                                        <MenuItem key={screen.id} value={screen.name}>
                                            {screen.name}
                                        </MenuItem>
                                       ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>

                                    <Grid item xs={12} container justifyContent="center">
                                        <Button type="submit" variant="contained" color="primary">
                                            Add Seat
                                        </Button>
                                    </Grid>
                                    
                                </Grid>
                            </form>
                            </Box>
                            {success && <Alert severity="success">{success}</Alert>}
                            {error && <Alert severity="error">{error}</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddSeats;

