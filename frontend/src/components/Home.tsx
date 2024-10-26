import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress, IconButton, Avatar, Button, Menu, MenuItem } from '@mui/material';
import SearchBar from './SearchBar';
import MovieTemplate from './MovieTemplate';
import { Movie } from '../core/models/Movie';
import SideBar from './Sidebar/SideBar';
import { getMovies } from '../core/services/movieService';
import { useNavigate } from 'react-router-dom';
import { City } from '../core/models/City';
import { getCities } from '../core/services/theatreService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [shows, setShows] = useState<[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [langFilter, setLangFilter] = useState<string[]>([]);
  const [formatFilter, setFormatFilter] = useState<string[]>([]);
  const [genreFilter, setGenreFilter] = useState<string[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCity, setSelectedCity] = useState<string>('City');

  // Handle city selection menu
  const handleCityClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCityClose = (city?: string) => {
    setAnchorEl(null);
    if (city) {
      setSelectedCity(city);
    }
  };
  useEffect(()=>{
    setFilteredMovies( shows.filter((show)=>show.theatre.city.name=== selectedCity))
    },[selectedCity])
  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        console.log(data);
        setShows(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchMovies();
    fetchCities();
  }, []);
// useEffect(() => {
  //   const filteredMovies = shows.filter(movie => {
  //     const langMatch = movie.languages.length !== 0 && movie.languages.some(language => langFilter.includes(language.name));
  //     const formatMatch = movie.formats.length !== 0 && movie.formats.some(format => formatFilter.includes(format._type));
  //     const genreMatch = movie.genres.length !== 0 && movie.genres.some(genre => genreFilter.includes(genre._type));
  //     const cityMatch = movie.city === selectedCity;

  //     return (langMatch || formatMatch || genreMatch) && cityMatch;
  //   });

  //   setFilteredMovies(filteredMovies.length === 0 ? movies : filteredMovies);
  // }, [langFilter, formatFilter, genreFilter, selectedCity, movies]);

  // const handleSearch = (query: string) => {
  //   setSearchQuery(query);
  //   if (query) {
  //     const filtered = movies.filter(movie =>
  //       movie.name.toLowerCase().includes(query.toLowerCase()) && movie.city === selectedCity
  //     );
  //     setFilteredMovies(filtered);
  //   } else {
  //     setFilteredMovies(movies.filter(movie => movie.city === selectedCity));
  //   }
  //  };
if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display={"flex"} sx={{ flex: 1 }}>
      <div>
        <SideBar setLangFilter={setLangFilter} setFormatFilter={setFormatFilter} setGenreFilter={setGenreFilter} />
      </div>
      <div style={{ overflowY: "scroll", height: "100vh", marginLeft: "10px", paddingLeft: "20px", width: "100%" }}>
        <Box display="flex" alignItems="center">
          {/* Select City Button */}
          <Button
            variant="contained"
            onClick={handleCityClick}
            sx={{
              marginRight: "10px",
              backgroundColor: "#1976d2",
              color: "#fff",
              '&:hover': {
                backgroundColor: "#115293",
              },
            }}
          >
            {selectedCity}
          </Button>

          {/* City Selection Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleCityClose()}
          >
            {cities.map((city) => (
              <MenuItem key={city.id} onClick={() => handleCityClose(city.name)}>
                {city.name}
              </MenuItem>
            ))}
          </Menu>

          {/* <SearchBar onSearch={handleSearch} /> */}
          <IconButton
            sx={{
              marginLeft: "20px",
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: "50%",
              '&:hover': {
                backgroundColor: "#115293",
              }
            }}
            onClick={() => navigate('/profile')}
          >
            <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>P</Avatar>
          </IconButton>
        </Box>
        <Typography variant="h4" sx={{ padding: "10px 0px 0px 10px", mb: 2, color: "rgb(13, 67, 137)" }}>
          Latest Releases
        </Typography>
        {filteredMovies.length === 0 && searchQuery ? (
          <Typography variant="h6" sx={{ padding: "10px" }}>
            No results found for "{searchQuery}".
          </Typography>
        ) : (
          <Grid container spacing={0.1}>
            {filteredMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.movie.id}>
                <MovieTemplate movie={movie.movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Box>
  );
};

export default Home;