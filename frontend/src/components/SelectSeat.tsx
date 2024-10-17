import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat'; // Import seat icon

const totalSeats = 40; // Total seats
const seatsPerRow = 8; // Seats per row

const SelectSeat: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get movie ID from URL
  const location = useLocation();
  const movieName = location.state?.movieName || "Movie"; // Get movie name from state

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showtime, setShowtime] = useState<string | null>(null);

  const handleSeatClick = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleShowtimeSelect = (time: string) => {
    setShowtime(time);
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0 || !showtime) {
      alert('Please select seats and a showtime');
    } else {
      alert(`Booking confirmed for ${selectedSeats.length} seats at ${showtime}`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Select Your Seats for {movieName} 
      </Typography>

      {/* Seat Layout with 40 seats */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${seatsPerRow}, 1fr)`, 
          gap: '10px',
          mb: 4,
        }}
      >
        {Array.from({ length: totalSeats }, (_, index) => {
          const seatNumber = index + 1;
          const isSelected = selectedSeats.includes(seatNumber);

          return (
            <EventSeatIcon
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              sx={{
                fontSize: '40px',
                cursor: 'pointer',
                color: isSelected ? 'gray' : 'dodgerblue', // Selected or Available colors
              }}
            />
          );
        })}
      </Box>

      {/* Showtime selection */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Select a Showtime:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant={showtime === '11:00 AM' ? 'contained' : 'outlined'}
          onClick={() => handleShowtimeSelect('11:00 AM')}
          sx={{ mr: 1 }}
        >
          11:00 AM
        </Button>
        <Button
          variant={showtime === '3:00 PM' ? 'contained' : 'outlined'}
          onClick={() => handleShowtimeSelect('3:00 PM')}
          sx={{ mr: 1 }}
        >
          3:00 PM
        </Button>
        <Button
          variant={showtime === '6:00 PM' ? 'contained' : 'outlined'}
          onClick={() => handleShowtimeSelect('6:00 PM')}
        >
          6:00 PM
        </Button>
      </Box>

      {/* Booking summary */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        {selectedSeats.length} Tickets for {showtime || 'No showtime selected'}
      </Typography>

      <Button variant="contained" color="primary" onClick={handleConfirmBooking}>
        Confirm Booking
      </Button>
    </Box>
  );
};

export default SelectSeat;
