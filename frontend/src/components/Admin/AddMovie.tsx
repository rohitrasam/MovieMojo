import React, { BaseSyntheticEvent, useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { Button, TextField, Container, Typography, Grid, Card, CardContent, Link, Breadcrumbs } from "@mui/material";
import "./AdminDashboard.css";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    name: "", posterUrl: "", desc: "", rating: 0,
    release_date: "", duration: 0, languages: "",
    genres: "", cast: "", formats: "", poster_url:""
  });
  const [errors, setErrors] = useState('');

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie, [name]: value
    }));
  };

  const validateData = () => {
    const { name, desc, rating, release_date, duration, languages, genres, cast, formats, poster_url } = movie;
    if (!name || !desc || !rating || !release_date || !duration || !languages || !genres || !cast || !formats || !poster_url) {
      setErrors("All fields are required");
      return true;
    }
    if (rating < 1 || rating > 10) {
      setErrors("Rating must be between 1 and 10");
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (validateData()) {
      return;
    }

    const movieExists = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movies/${movie.name}`);
        return response.data.exists;
      } catch (error) {
        return false;
      }
    };

    const exists = await movieExists();
    if (exists) {
      alert("Movie already exists");
      return;
    }
    handleSubmitApi();
  };

  const handleSubmitApi = () => {
    console.log("Movie Details:", movie);

    const languagesArray = movie.languages.split(",").map((lang) => ({ name: lang.trim() }));
    const genresArray = movie.genres.split(",").map((genre) => ({ _type: genre.trim() }));
    const castArray = movie.cast.split(",").map((castMember) => ({ _type: castMember.trim() }));
    const formatsArray = movie.formats.split(",").map((format) => ({ _type: format.trim() }));

    axios.post("http://localhost:8000/movies/post_movie", {
      ...movie,
      languages: languagesArray,
      genres: genresArray,
      cast: castArray,
      formats: formatsArray
    })
      .then((result) => {
        console.log(result);
        alert("Movie added successfully");
        setMovie({
          name: "", posterUrl: "", desc: "", rating: 0,
          release_date: "", duration: 0, languages: "",
          genres: "", cast: "", formats: "", poster_url: "",
        });
      })
      .catch(() => {
        alert("Failed to add");
      });
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
      display: 'none',
    }
  }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to="/admindashboard">Dashboard</Link>
        <Typography color="textPrimary">Add Movie</Typography>
      </Breadcrumbs>
      <Card className="card-style" sx={{ height: '85vh', overflow: 'scroll', padding: 2 ,
      '&::-webkit-scrollbar': {
        display: 'none',
      }
    }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Add Movie
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Movie Name"
                  name="name"
                  fullWidth
                  value={movie.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Movie Description"
                  name="desc"
                  fullWidth
                  multiline
                  rows={3}
                  value={movie.desc}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Duration (minutes)"
                  type="number"
                  name="duration"
                  fullWidth
                  value={movie.duration}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Release Date"
                  type="date"
                  name="release_date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={movie.release_date}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rating"
                  type="number"
                  name="rating"
                  fullWidth
                  inputProps={{ min: 1, max: 10 }}
                  value={movie.rating}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Languages (comma-separated)"
                  name="languages"
                  fullWidth
                  value={movie.languages}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Genres (comma-separated)"
                  name="genres"
                  fullWidth
                  value={movie.genres}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cast (comma-separated)"
                  name="cast"
                  fullWidth
                  value={movie.cast}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Formats (comma-separated)"
                  name="formats"
                  fullWidth
                  value={movie.formats}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  label="Theatre Name"
                  name="theatreName"
                  fullWidth
                  value={movie.theatreName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City Name"
                  name="cityName"
                  fullWidth
                  value={movie.cityName}
                  onChange={handleChange}
                  required
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Poster URL"
                  name="poster_url"
                  fullWidth
                  value={movie.poster_url}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Add Movie
            </Button>
          </form>
          {errors && <Typography color="error" align="center">{errors}</Typography>}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddMovie;
