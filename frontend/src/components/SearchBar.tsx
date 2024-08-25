import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ width: '100%', maxWidth: '1600px' }}>
      <TextField
        fullWidth
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: '#8rgb(13, 67, 137);', color: 'white;' }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
