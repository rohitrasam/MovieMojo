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
  city: City; // Assuming city has an id and name
}

const ViewTheatres: React.FC = () => {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTheatre, setSelectedTheatre] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingTheatre, setEditingTheatre] = useState<Theatre | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tName, setTname] = useState('');
  const [address, setAddress] = useState('');
  const[filteredTheatres,setfilteredTheatres]=useState<Theatre[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  useEffect(() => {
      const fetchCities = async () => {
        try {
          const citiesResponse = await axios.get('http://localhost:8000/theatre/get_cities');
          setCities(citiesResponse.data);
          console.log(cities);
          const theatresResponse = await axios.get('http://localhost:8000/theatre/get_theatres');
          setTheatres(theatresResponse.data);
        } catch (err) {
          setError("Failed to fetch data. Please try again.");
        }
      };
      fetchCities();
  },[theatres,cities]);

  
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


  // Handle theatre deletion
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/theatre/delete/${id}`);
      setSuccess("Theatre deleted successfully!");
      // fetchCities(); // Refresh the list
    } catch (err) {
      setError("Failed to delete theatre. Please try again.");
    }
  };

  // Handle editing theatre
  const handleEdit = (theatre: Theatre) => {
    setEditingTheatre(theatre);
    setTname(theatre.name);
    setAddress(theatre.address);
    setSelectedCityId(theatre.city.id); 
    setDialogOpen(true);
  };

  // Handle dialog submission
  const handleDialogSubmit = async () => {
    if (editingTheatre) {
      try {
        await axios.put(`/api/theatres/${editingTheatre.id}`, {
          name: tName,
          address: address,
          city: selectedCityId,
        });
        setSuccess("Theatre updated successfully!");
        setDialogOpen(false);
        // fetchCities(); // Refresh the list
      } catch (err) {
        setError("Failed to update theatre. Please try again.");
      }
    }
  };

  // Close dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingTheatre(null);
    setTname('');
    setAddress('');
    setSelectedCityId(null);
  };

 
  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Manage Theatres</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h2" align="center">
                Manage and View Theatres
              </Typography>
              {success && <Alert severity="success">{success}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
              
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

              <TableContainer component={Paper}>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Theatre</DialogTitle>
        <DialogContent>
          <TextField
            label="Theatre Name"
            fullWidth
            value={tName}
            onChange={(e) => setTname(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Address"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
          <InputLabel>Select City</InputLabel>
                <Select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    // setSelectedTheatre("");
                  }}>
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
          <Button onClick={handleDialogSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewTheatres;