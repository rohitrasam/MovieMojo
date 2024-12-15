import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

const ViewTheatres: React.FC = () => {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTheatre, setSelectedTheatre] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingTheatre, setEditingTheatre] = useState<Theatre | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tName, setTname] = useState('');
  const [address, setAddress] = useState('');
  const[filteredTheatres,setfilteredTheatres]=useState<Theatre[]>([]);
  const [updatedCityName, setUpdatedCityName] = useState<string| null>(null);

  const fetchCities = async () => {
    try {
      const citiesResponse = await axios.get('http://localhost:8000/theatre/get_cities');
      setCities(citiesResponse.data);
      const theatresResponse = await axios.get('http://localhost:8000/theatre/get_theatres');
      setTheatres(theatresResponse.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }finally {
      setLoading(false);
    }
  };
  useEffect(() => {     
      fetchCities();
  },[]);

  
  useEffect(() => {
    if (selectedCity) {
      const fetchMovies = async () => {
        try {
          setfilteredTheatres(theatres.filter((theatre) => theatre.city.name === selectedCity))
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError("Failed to fetch movies. Please try again later.");
        }
      };

      fetchMovies();
    }
  }, [selectedCity,theatres,selectedTheatre]);


 
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/theatre/delete/${id}`);
      setSuccess("Theatre deleted successfully!");
      fetchCities();
    } catch (err) {
      setError("Failed to delete theatre. Please try again.");
    }
  };

  const handleEdit = (theatre: Theatre) => {
    setEditingTheatre(theatre);
    setTname(theatre.name);
    setAddress(theatre.address);
    setUpdatedCityName(theatre.city.name); 
    setDialogOpen(true);
  };

  const handleDialogSubmit = async (id:number) => {
    if (editingTheatre) {
      try {
  await axios.patch(`http://localhost:8000/theatre/edit/${id}`, {
          name: tName,
          address: address,
          city: updatedCityName,
         
        });
          
        setSuccess("Theatre updated successfully!");
        setDialogOpen(false);
        fetchCities();
      } catch (err) {
        setError("Failed to update theatre. Please try again.");
      }
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingTheatre(null);
    setTname('');
    setAddress('');
    setUpdatedCityName(null);
  };

 
  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Manage Theatres</Typography>
      </Breadcrumbs>
       <Card>
          <CardContent>
              <Typography variant="h4" component="h2" align="center">
                Manage and View Theatres
              </Typography>
              {success && <Alert severity="success">{success}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
        
              <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                <Grid item xs={12}>
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
                    <em>None</em>
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
              </Grid>
              {filteredTheatres.length === 0 && !loading && (
            <Typography variant="body1">No theatres available for the selected filters.</Typography>
          )}

          {filteredTheatres.length > 0 && (
            <TableContainer component={Paper} maxWidth="md" sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
              '&::-webkit-scrollbar': {
              display: 'none',
            }
            }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Theatre Name</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTheatres.map((theatre) => (
                      <TableRow key={theatre.id}>
                        <TableCell>{theatre.name}</TableCell>
                        <TableCell>{theatre.address}</TableCell>
                        <TableCell>{theatre.city.name}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(theatre)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(theatre.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          )}
            </CardContent>
          </Card>
       

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Theatre</DialogTitle>
        <DialogContent>
          <TextField
            label="Theatre Name"
            fullWidth
            value={tName}
            onChange={(e) => setTname(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Address"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
          <InputLabel>Select City</InputLabel>
                <Select
                  value={updatedCityName}
                  onChange={(e) => {
                    setUpdatedCityName(e.target.value);
                  }}
                  label="Select City">
              <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {cities.length > 0 &&
                    cities.map((city) => (
                      <MenuItem key={city.id} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogSubmit(editingTheatre.id)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewTheatres;