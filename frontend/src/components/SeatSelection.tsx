import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useParams, useNavigate } from "react-router-dom";
import { getSeatsByScreen, updateSeats } from "../core/services/seatService";
import axios from "axios";

interface Seat {
  seat_num: string;
  _type: string;
  price: number;
  cols: number;
}

const seatTypeColors: Record<string, string> = {
  Premium: "gold",
  Gold: "yellow",
  Silver: "gray",
  Standard: "dodgerblue",
};

const SeatSelection: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [assignedType, setAssignedType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [cols, setColumns] = useState<number>(0);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        console.log(showId);

        const fetchedSeats = await getSeatsByScreen(showId!);
        setSeats(fetchedSeats[0]);
        setColumns(fetchedSeats[1]);
      } catch (err) {
        setError("Failed to fetch seats. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [showId]);

  const handleSeatClick = (seatNum: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNum)
        ? prev.filter((seat) => seat !== seatNum)
        : [...prev, seatNum]
    );
  };

  const handleAssignType = async () => {
    if (!assignedType) return;

    const seatPrice =
      assignedType === "Premium"
        ? 750
        : assignedType === "Gold"
        ? 450
        : assignedType === "Silver"
        ? 350
        : 200;

    const updatedSeats = seats.map((seat) =>
      selectedSeats.includes(seat.seat_num)
        ? { ...seat, _type: assignedType, price: seatPrice }
        : seat
    );

    try {
      await updateSeats(showId!, selectedSeats, assignedType, seatPrice);
      setSeats(updatedSeats);
      setSuccessMessage("Seats updated successfully!");
    } catch (err) {
      setError("Failed to update seats. Please try again.");
    } finally {
      setSelectedSeats([]);
    }
  };

  const handleBookSeats = async () => {
    try {
      const response = axios.post("http://localhost:8000/show/add_booking", {
          movie: "", 
          // time: , 
          email: localStorage.getItem("user").email, 
          seats: selectedSeats, 
        });

      if (!response.ok) {
        throw new Error("Failed to book seats");
      }

      const data = await response.json();
      alert("Ticket booked")
      navigate(`/home`);
    } catch (err) {
      setError("Failed to book seats. Please try again.");
    } finally {
      setSelectedSeats([]);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        overflow: "scroll",
        padding: 2,
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            gridTemplateColumns: `repeat(10, 1fr)` /* Adjust columns as needed */,
            gap: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography variant="h4" sx={{ mb: 3 }}>
              Select Your Seats
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: "10px",
                mb: 4,
              }}
            >
              {seats.map((seat) => (
                <EventSeatIcon
                  key={seat.seat_num}
                  onClick={() => handleSeatClick(seat.seat_num)}
                  sx={{
                    fontSize: "40px",
                    cursor: "pointer",
                    color: selectedSeats.includes(seat.seat_num)
                      ? "green"
                      : seatTypeColors[seat._type] || "lightgray",
                  }}
                />
              ))}
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleBookSeats}
            disabled={!selectedSeats.length}
            sx={{ mt: 4 }}
          >
            Book Ticket
          </Button>

          {successMessage && (
            <Alert severity="success" sx={{ mt: 4 }}>
              {successMessage}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SeatSelection;
