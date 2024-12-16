import axios from "axios";

export const getSeatsByScreen = async (screenId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/screen/get_screen_seats/${screenId}`
    );
    console.log(response);
    
    return [response.data.seats, response.data.cols];
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

export const updateSeats = async (
  screenId: string,
  seatNumbers: string[],
  type: string,
  price: number
) => {
  try {
    await axios.patch(`http://localhost:8000/screen/update_seats/${screenId}`, {
      seats: seatNumbers.map((seat) => ({
        seat_num: seat,
        _type: type,
        price,
      })),
    });
    console.log("Seats updated successfully");
  } catch (error) {
    console.error("Error updating seats:", error);
    throw error;
  }
};
