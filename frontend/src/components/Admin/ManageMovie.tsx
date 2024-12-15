import { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
  Container, Typography, Card, CardContent, Breadcrumbs,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Link,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Language from "../../core/models/Languages";
import Genre from "../../core/models/Genre";
import Format from "../../core/models/Format";

interface Movie {
  theatreName: string;
  cityName: string;
  id: number;
  name: string;
  poster_url: string;
  desc: string;
  rating: number;
  release_date: string;
  duration: number;
  languages: Language[];
  genres: Genre[];
  cast: string;
  formats: Format[];
}

const ManageMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [posterURL, setPosterURL] = useState('');
  const [formats, setFormats] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/movies/delete/${id}`);
      alert("Movie deleted successfully!");
      fetchMovies();
    } catch (err) {
      alert("Failed to delete Movie. Please try again.");
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setPosterURL(movie.poster_url);
    setDescription(movie.desc);
    setLanguages(movie.languages.map(language=>language.name)); 
    setFormats(movie.formats.map(format=>format._type));
    setGenres(movie.genres.map(genre=>genre._type));
    setDialogOpen(true);
  };

  const handleDialogSubmit = async (id:number) => {
    console.log(id);
    
    if (editingMovie) {
      try {
  await axios.patch(`http://localhost:8000/movies/edit/${id}`, {
          poster_url: posterURL,
          desc: description,
          formats: formats.map(format => ({_type: format})),
          languages: languages.map(language => ({name: language})),
          genres:genres.map(genre => ({_type: genre}))
         
        });
        alert("Movie updated successfully!");
        setDialogOpen(false);
      } catch (err) {
        alert("Failed to update Movie. Please try again.");
        setDialogOpen(false);
      }
    }
  };

  const dataSplit = (setFunc, data: string) => {
    setFunc(data.split(","))
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingMovie(null);
    setPosterURL('');
    setDescription('');
    setLanguages([]); 
    setFormats([]);
    setGenres([]);
  };


  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Manage Movies</Typography>
      </Breadcrumbs>

      <Card sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
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
                  <TableCell>Duration (minutes)</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Release Date</TableCell>
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
                    <TableCell>
                      <IconButton onClick={() => handleEdit(movie)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(movie.id)}>
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

  <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Poster URL"
                fullWidth
                value={posterURL}
                onChange={(e) => setPosterURL(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Languages"
                fullWidth
                value={languages}
                onChange={(e) => dataSplit(setLanguages, e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Format"
                fullWidth
                value={formats}
                onChange={(e) => dataSplit(setFormats, e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Genre"
                fullWidth
                value={genres}
                onChange={(e) => dataSplit(setGenres, e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>handleDialogSubmit(editingMovie.id)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default ManageMovie;
