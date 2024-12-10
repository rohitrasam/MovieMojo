import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container, Typography, Card, CardContent, Breadcrumbs, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Link, CircularProgress, FormControl,
  InputLabel, MenuItem, Select, Alert, Grid,
  IconButton,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";

interface Screen {
  id: number;
  name: string;
  theatre: Theatre;
}

interface Theatre {
  id: number;
  name: string;
  city: City;
  address:string;
}

interface City {
  id: number;
  name: string;
}

const ManageScreens = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre>(null);
  const [filteredScreens, setFilteredScreens] = useState<Screen[]>([]);
  const [editingScreen, setEditingScreen] = useState<Screen | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [citiesResponse, theatresResponse, screensResponse] = await Promise.all([
        axios.get("http://localhost:8000/theatre/get_cities"),
        axios.get("http://localhost:8000/theatre/get_theatres"),
        axios.get("http://localhost:8000/screen/get_screens")
      ]);
      setCities(citiesResponse.data);
      setTheatres(theatresResponse.data);
      setScreens(screensResponse.data);
      console.log(screensResponse.data);
      
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCity && selectedTheatre) {
      const filtered = screens.filter(
        (screen) => screen.theatre.name === selectedTheatre.name && screen.theatre.city.name === selectedCity&&
        screen.theatre.address === selectedTheatre.address);
      setFilteredScreens(filtered);
    } else {
      setFilteredScreens([]);
    }
  }, [selectedCity, selectedTheatre, screens]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/screen/delete/${id}`);
      setSuccess("Screen deleted successfully!");
    } catch (err) {
      setError("Failed to delete screen. Please try again.");
    }
  };


  const handleEdit = (screen: Screen) => {
    setEditingScreen(screen);
    setName(screen.name);
   
    
    setDialogOpen(true);
  };

  const handleDialogSubmit = async () => {
    if (editingScreen) {
      try {
        await axios.patch(`http://localhost:8000/screen/edit/${editingScreen.id}`, {
          name: name
          
        });
        setSuccess("Screen updated successfully!");
        setDialogOpen(false);
        console.log(name);
        fetchInitialData(); 
      } catch (err) {
        console.error("Error updating screen:", err);
        setError("Failed to update screen. Please try again.");
      }
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingScreen(null);
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'scroll', padding: 2, 
    '&::-webkit-scrollbar': { display: 'none' }
     }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Manage and View Screens</Typography>
      </Breadcrumbs>

      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Manage and View Screens
          </Typography>

          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Grid container spacing={3} style={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select City</InputLabel>
                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  label="Select City"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" disabled={!selectedCity}>
                <InputLabel>Select Theatre</InputLabel>
                <Select
                  value={selectedTheatre}
                  onChange={(e) => setSelectedTheatre(e.target.value)}
                  label="Select Theatre"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {theatres.filter((theatre) => theatre.city.name === selectedCity).map((theatre) => (
                    <MenuItem key={theatre.id} value={theatre}>
                      {theatre.name},{theatre.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {filteredScreens.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No</TableCell>
                    <TableCell>Screen Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredScreens.map((screen, index) => (
                    <TableRow key={screen.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{screen.name}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(screen)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(screen.id)}>
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
        <DialogTitle>Edit Screen</DialogTitle>
        <DialogContent>
          <TextField
            label="Screen Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleDialogSubmit} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageScreens;
