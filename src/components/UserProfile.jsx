import React, { useState, useEffect } from 'react';
import { getUserDetails, getUserBookings, deleteBooking } from '../api/ApiService';
import { IconButton, Typography, Box, Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userDetails = await getUserDetails();
        setUser(userDetails);
        
        const userBookings = await getUserBookings();
        setBookings(userBookings);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchData();
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
  };

  const handleDeleteBooking = async (id) => {
    try {
      await deleteBooking(id);
      // Reload bookings after deleting
      const userBookings = await getUserBookings();
      setBookings(userBookings);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div>
      {user && (
        <Box>
          <Typography variant="h4">Welcome, {user.name}</Typography>
          <Typography variant="subtitle1">Email: {user.email}</Typography>

          <Typography variant="h5">Booked Tickets:</Typography>
          {bookings.length > 0 ? (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <Typography variant="body1">
                    Movie: {booking.movieName} - Date: {booking.date}
                  </Typography>
                  <IconButton onClick={() => handleDeleteBooking(booking.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">No booked tickets found.</Typography>
          )}

          <Button onClick={handleLogout} endIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </Box>
      )}
    </div>
  );
};

export default UserProfile;
