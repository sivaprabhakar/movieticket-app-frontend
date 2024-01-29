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
      } catch (error) {
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
    <div style={{ padding: "20px", background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", minHeight: "100vh", color: "#fff" }}>
      {userProfile && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: "20px", textAlign: "center", background: "linear-gradient(to bottom, #2c3e50, #273746)", borderRadius: "10px" }}>
                <Avatar alt={userProfile.user.name} src={userProfile.user.avatar} sx={{ width: 100, height: 100, margin: "auto" }} />
                <Typography variant="h5" style={{ marginTop: "10px", color: "#fff" }}>
                  {userProfile.user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" style={{ color: "#ccc" }}>
                  {userProfile.user.email}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper style={{ padding: "20px", background: "linear-gradient(to right, #1e272e, #485460)", borderRadius: "10px" }}>
                <Typography variant="h4" gutterBottom style={{ color: "#fff" }}>
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
                      style={{ marginBottom: "20px", cursor: "pointer", backgroundColor: selectedBooking === booking ? "#f5f5f5" : "#fff", borderRadius: "8px" }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                          Movie: <span style={{ fontWeight: "normal" }}>{booking.movie.title}</span>
                        </Typography>
                        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                          Date: <span style={{ fontWeight: "normal" }}>{new Date(booking.date).toDateString()}</span>
                        </Typography>
                        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                          Seat Numbers: <span style={{ fontWeight: "normal" }}>{booking.seatNumbers.join(", ")}</span>
                        </Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click when cancel button is clicked
                            handleCancelBooking(booking._id);
                          }}
                          style={{ marginTop: "10px", background: "#e11c15", borderRadius: "8px" }}
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
