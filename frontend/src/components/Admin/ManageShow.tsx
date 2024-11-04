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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
      name: string;
      theatre: {
        name: string;
        city: {
          name: string;
        };
      };
    };
    time: string;
  }
  
  interface Theatre {
    id: number;
    name: string;
    city: City;
  }
  interface City {
    id: number;
    name: string;
  }
  

const ManageShow = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredTheatres, setFilteredTheatres] = useState<Theatre[]>([]);
  const [filteredShows, setFilteredShows] = useState<Show[]>([]);

useEffect(() => {
    fetchShow();
  }, []);
    const fetchShow = async () => {
      try {
        const [citiesResponse, theatresResponse, showsResponse] = await Promise.all([
          axios.get("http://localhost:8000/theatre/get_cities"),
          axios.get("http://localhost:8000/theatre/get_theatres"),
          axios.get("http://localhost:8000/show/get_admin_shows")
        ]);
        
        setCities(citiesResponse.data);
        setTheatres(theatresResponse.data);
        setShows(showsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (selectedCity) {
      setFilteredTheatres(theatres.filter((theatre) => theatre.city.name === selectedCity));
      setFilteredShows([]);
      setSelectedTheatre(""); 
    }
  }, [selectedCity, theatres]);

  useEffect(() => {
    if (selectedCity && selectedTheatre) {
      setFilteredShows(shows.filter(
        (show) =>
          show.screen.theatre.name === selectedTheatre && 
          show.screen.theatre.city.name === selectedCity
      ));
    }
  }, [selectedCity, selectedTheatre, shows]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/show/delete/${id}`);
      setSuccess("Theatre deleted successfully!");
      fetchShow(); 
    } catch (err) {
      setError("Failed to delete theatre. Please try again.");
    }
  };


  const handleEdit = (show) => {
    setEditingShow(show);
    setSelectedDate(new Date(show.time).toISOString().slice(0, 16));
    setSelectedScreen(show.screen.name);
    setDialogOpen(true);
  };

  const handleDialogSubmit = async () => {
    if (editingShow) {
      try {
        await axios.put(`http://localhost:8000/show/edit/${editingShow.id}`, {
          time: selectedDate,
          screen: selectedScreen,
        });
        setSuccess("Show updated successfully!");
        setDialogOpen(false);
        fetchShow();
      } catch (err) {
        setError("Failed to update show. Please try again.");
      }
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingShow(null);
    setSelectedDate('');
  };
  useEffect(() => {
    fetchShow();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Manage and View Shows</Typography>
      </Breadcrumbs>

      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Manage and View Shows
          </Typography>

          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}

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
                  {filteredTheatres.map((theatre) => (
                    <MenuItem key={theatre.id} value={theatre.name}>
                      {theatre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {filteredShows.length === 0 && !loading && selectedTheatre && (
            <Typography variant="body1">No shows available for the selected filters.</Typography>
          )}

          {filteredShows.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No</TableCell>
                    <TableCell>Movie Name</TableCell>
                    <TableCell>Screen</TableCell>
                    <TableCell>Date-Time</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredShows.map((show, index) => (
                    <TableRow key={show.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{show.movie.name}</TableCell>
                      <TableCell>{show.screen.name}</TableCell>
                      <TableCell>
                        {new Date(show.time).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            timeZone: "UTC"
                        })}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(show)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(show.id)}>
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
        <DialogTitle>Edit Show</DialogTitle>
        <DialogContent>
          <TextField
            label="Date and Time"
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Screen</InputLabel>
            <Select
              value={selectedScreen}
              onChange={(e) => {
                setSelectedScreen(e.target.value)
              }}
              label="Select Screen"
            >
              {/* {filteredShows.map((show) =>
                show.screen.map((screen) => (
                  <MenuItem key={screen.id} value={screen.name}>
                    {screen.name}
                  </MenuItem>
                ))
              )} */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleDialogSubmit} color="primary">Update </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageShow;
