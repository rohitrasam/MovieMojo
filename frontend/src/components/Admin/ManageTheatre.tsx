import React, { useEffect, useState } from "react";
import axios from 'axios';
import{Link as RouterLink } from "react-router-dom"
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
interface Theatre {
  id: number;
  name: string;
  address: string;
  city: {id:number ; name:string};
}

const ManageTheatre: React.FC = () => {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingTheatre, setEditingTheatre] = useState<Theatre | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tName, setTname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  // Fetch theatres from the backend
  const fetchTheatres = async () => {
    try {
      const response = await axios.get('http://localhost:8000/theatre/get_theatres');
      setTheatres(response.data);
    } catch (err) {
      setError("Failed to fetch theatres. Please try again.");
    }
  };

  // Handle theatre deletion
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/theatre/delete/${id}`);
      setSuccess("Theatre deleted successfully!");
      fetchTheatres(); // Refresh the list
    } catch (err) {
      setError("Failed to delete theatre. Please try again.");
    }
  };

  // Handle editing theatre
  const handleEdit = (theatre: Theatre) => {
    setEditingTheatre(theatre);
    setTname(theatre.name);
    setAddress(theatre.address);
    setCity(theatre.city.name);
    setDialogOpen(true);
  };

  // Handle dialog submission
  const handleDialogSubmit = async () => {
    if (editingTheatre) {
      try {
        await axios.put(`/api/theatres/${editingTheatre.id}`, {
          name: tName,
          address: address,
          city: city,
        });
        setSuccess("Theatre updated successfully!");
        setDialogOpen(false);
        fetchTheatres(); // Refresh the list
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
    setCity('');
  };

  // Fetch theatres on component mount
  useEffect(() => {
    fetchTheatres();
  }, []);

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
                Manage Theatres
              </Typography>
              {success && <Alert severity="success">{success}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
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
                    {theatres.map((theatre) => (
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
          <TextField
            label="City"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
          />
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

export default ManageTheatre;
