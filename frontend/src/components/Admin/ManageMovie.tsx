import { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
  Container, Typography, Card, CardContent, Breadcrumbs,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Link
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Movie {
  id: number;
  name: string;
  desc: string;
  duration: number;
  rating: number;
  release_date: string;
  theatreName: string;
  cityName: string;
}

const ManageMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8000/movies/get_movies");
      setMovies(response.data);
    } catch (error) {
      setError('Failed to fetch movies');
      console.error("Error fetching movies:", error);
    }
  };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Do you really want to delete this movie?")) {
//       try {
//         await axios.delete(`http://localhost:8000/movies/${id}/delete`);
//         alert("Movie deleted successfully");
//         fetchMovies();
//       } catch (error) {
//         console.error("Error deleting movie:", error);
//       }
//     }
//   };


  
const handleDelete = async (id: number) => {
    console.log("Deleting movie with id:", id); 
    if (!id) {
      alert("Invalid movie ID.");
      return;
    }
  
    if (window.confirm("Do you really want to delete this movie?")) {
      try {
        await axios.delete(`http://localhost:8000/movies/${id}/delete`);
        alert("Movie deleted successfully");
        fetchMovies(); 
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };
  



  const handleEdit = (id: number) => {
    window.location.href = `/edit-movie/${id}`;
  };

  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Manage Movies</Typography>
      </Breadcrumbs>

      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Manage Movies
          </Typography>

          <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No</TableCell>
                  <TableCell>Movie Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Release Date</TableCell>
                  <TableCell>Theatre Name</TableCell>
                  <TableCell>City Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie, index) => (
                  <TableRow key={movie.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{movie.name}</TableCell>
                    <TableCell>{movie.desc}</TableCell>
                    <TableCell>{movie.duration}</TableCell>
                    <TableCell>{movie.rating}</TableCell>
                    <TableCell>{new Date(movie.release_date).toLocaleDateString()}</TableCell>
                    <TableCell>{movie.theatreName}</TableCell>
                    <TableCell>{movie.cityName}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(movie.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(movie.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {error && <Typography color="error" align="center">{error}</Typography>}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ManageMovie;
