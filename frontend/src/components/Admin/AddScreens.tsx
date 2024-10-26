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
  

const AddScreens: React.FC = () => {
    const [name, setName] = useState('');
    const [rows, setRows] = useState('');
    const [cols, setCols] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const[theatre,setTheatres]=useState<Theatre[]>([]);
    const[cities,setCities]=useState<City[]>([]);
    const[selectedTheatre,setSelectedTheatre]=useState<Theatre>(null);
    const[filteredTheatres,setfilteredTheatres]=useState<Theatre[]>([]);
    const[selectedCity,setSelectedCity]=useState<string>("");
    
useEffect(()=>{
    const fetchCitiesAndTheatres = async () => {
        try {
          const citiesResponse = await axios.get("http://localhost:8000/theatre/get_cities");
          const theatresResponse = await axios.get("http://localhost:8000/theatre/get_theatres");
          setCities(citiesResponse.data);
          
          
          setTheatres(theatresResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again later.");
        } 
      };
  
      fetchCitiesAndTheatres();
    }, []);
  

    useEffect(() => {
        if (selectedCity) {
          const fetchMovies = async () => {
            try {
              setfilteredTheatres(theatre.filter((theatre) => theatre.city.name === selectedCity))
            } catch (error) {
              console.error("Error fetching movies:", error);
              setError("Failed to fetch movies. Please try again later.");
            }
          };
    
          fetchMovies();
        }
      }, [selectedCity,theatre,selectedTheatre]);
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
               
        try {
            const response = await axios.post("http://localhost:8000/screen/add_screen", {  
                name: name,
                rows: rows,
                cols: cols,
                city: selectedCity,
                theatre : selectedTheatre.name,
                address : selectedTheatre.address

            });

            if (response.status === 200) {
                
                // setSuccess("Screen has been added!");
                setSuccess(response.data);
                setName('');
                setRows('');
                setCols('');
                setSelectedCity('')  
                setSelectedTheatre('')  
            } else {
                setError("Something went wrong");
            }
        } catch (err) {
            setError("Please try again");
            console.log(err);
            
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
                        <Typography variant="h6" color="textPrimary">Add Screen </Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ width: '750px', height:'450px',margin: '0 auto' }}>
                        <CardContent>
                            <Typography variant="h4" component="h2" align="center">
                                Add Screen
                            </Typography>
                            <Box mt={2}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6} >
                                        <TextField
                                            label="Screen Name"
                                            fullWidth
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Number of Rows"
                                            fullWidth
                                            value={rows}
                                            onChange={(e) => setRows(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Numer of Columns"
                                            fullWidth
                                            value={cols}
                                            onChange={(e) => setCols(e.target.value)}
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
                                        onChange={(e) => setSelectedTheatre(e.target.value)}
                                        label="Select Theatre"
                                        >
                                       { filteredTheatres.map((theatre)=>(
                                        <MenuItem key={theatre.id} value={theatre}>
                                            {theatre.name+", " +theatre.address}
                                        </MenuItem>
                                       ))}
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12} container justifyContent="center">
                                        <Button type="submit" variant="contained" color="primary">
                                            Add Screen
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            {success && <Alert severity="success">{success}</Alert>}
                            {error && <Alert severity="error">{error}</Alert>}
                            </Box>
                        </CardContent>     
                    </Card>
                </Grid>
            </Grid> 
        </Container>
       
    );
};

export default AddScreens;

