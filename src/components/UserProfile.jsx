// UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, deleteBooking } from "../api/ApiService";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("Fetching user profile...");
      try {
        const profile = await getUserProfile(userId);
        console.log("After fetching user profile:", profile);
        setUserProfile(profile);
      }
      catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    const result = await deleteBooking(bookingId);
    if (result) {
      // Refresh user profile after canceling the booking
      const updatedProfile = await getUserProfile(userId);
      setUserProfile(updatedProfile);
    }
  };

  const handleCardClick = (booking) => {
    if (selectedBooking === booking) {
      setSelectedBooking(null);
    } else {
      setSelectedBooking(booking);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {userProfile && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: "20px", textAlign: "center" }}>
                <Avatar alt={userProfile.user.name} src={userProfile.user.avatar} sx={{ width: 100, height: 100, margin: "auto" }} />
                <Typography variant="h5" style={{ marginTop: "10px" }}>
                  {userProfile.user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {userProfile.user.email}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  Bookings
                </Typography>
                {userProfile.bookings.length === 0 ? (
                  <Typography>No bookings found.</Typography>
                ) : (
                  userProfile.bookings.map((booking) => (
                    <Card
                      key={booking._id}
                      onClick={() => handleCardClick(booking)}
                      elevation={selectedBooking === booking ? 5 : 1}
                      style={{ marginBottom: "20px", cursor: "pointer", backgroundColor: selectedBooking === booking ? "#f5f5f5" : "white" }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1">
                          Movie: {booking.movie.title}, Date: {new Date(booking.date).toDateString()}
                        </Typography>
                        <Typography variant="body2">Seat Numbers: {booking.seatNumbers.join(", ")}</Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click when cancel button is clicked
                            handleCancelBooking(booking._id);
                          }}
                          style={{ marginTop: "10px" }}
                          sx={{ bgcolor: "#2b2d42",
                          ":hover": {
                            bgcolor: "#121217",
                          }, }}
                        >
                          Cancel Booking
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default UserProfile;
