import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, newBooking } from '../api/ApiService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormLabel, Grid, Paper } from '@mui/material';
import { EventSeat, EventAvailable } from '@mui/icons-material';

const Booking = () => {
  const [movie, setMovie] = useState(null);
  const [inputs, setInputs] = useState({ date: '' });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmation, setConfirmation] = useState({ movie: '', seatNumbers: [], date: '', show: false });
  const { id } = useParams();

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.movie);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSeatSelection = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.date) {
      alert('Please select a date.');
      return;
    }

    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (!userId) {
      console.error('User ID not available');
      return;
    }

    try {
      console.log("Selected Seats:", selectedSeats);
      const res = await newBooking({
        userId: userId,
        movie: movie._id,
        seatNumbers: selectedSeats,
        date: inputs.date,
      });

      if (res && res.booking) {
        const { movie, seatNumbers, date } = res.booking;
        setConfirmation({ movie, seatNumbers, date, show: true });
        setSelectedSeats([]);
        setInputs({ date: '' });
      }
    } catch (error) {
      console.error('Error while booking:', error);
    }
  };

  const closeConfirmation = () => {
    setConfirmation({ ...confirmation, show: false });
  };

  return (
    <div>
      {movie && (
        <>
          <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign="center" color="secondary">
            Book Tickets For {movie.title}
          </Typography>
          <Box display="flex" justifyContent="center" gap={3}>
            <Box width="30%">
              <img
                width="100%"
                height="auto"
                src={movie.posterUrl}
                alt={movie.title}
                style={{ borderRadius: '10px', height: '80%' }}
              />
            </Box>
            <Box width="70%">
              <Typography variant="body1" gutterBottom style={{ marginBottom: '30px' }}>
                <b>{movie.description}</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                <b>Starrer:</b> {movie.actors.join(', ')}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <b>Release Date:</b> {new Date(movie.releaseDate).toDateString()}
              </Typography>
              <Paper elevation={3} style={{ marginTop: '30px', padding: '20px' }}>
                <Grid container justifyContent="center">
                  {Array.from({ length: 100 }, (_, index) => index + 1).map((seat) => (
                    <Grid item key={seat}>
                      <Button
                        variant="contained"
                        style={{
                          margin: '5px',
                          backgroundColor: selectedSeats.includes(seat) ? '#FF6F61' : '#FFE066',
                        }}
                        onClick={() => handleSeatSelection(seat)}
                      >
                        <Box display="flex" flexDirection="column" alignItems="center">
                          {selectedSeats.includes(seat) ? <EventAvailable /> : <EventSeat />}
                          <Typography variant="caption" fontWeight="bold">
                            {seat}
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
              <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <Box padding={5} margin="auto" display="flex" flexDirection="column">
                  <Box marginBottom={2}>
                    <FormLabel>Date</FormLabel>
                    <input
                      name="date"
                      type="date"
                      value={inputs.date}
                      onChange={handleChange}
                    />
                  </Box>
                  <Button type="submit" variant="contained" color="primary">
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </>
      )}
      {confirmation.show && (
       <div className="confirmation-overlay">
       <div className="confirmation-popup">
       <Typography variant="h5" marginBottom="20px">
        Ticket Booked Successfully
      </Typography>
      <Typography variant="body1" marginBottom="10px">
        Movie: {movie?.title}
      </Typography>
         <Typography variant="body1" marginBottom="10px">Seats: {confirmation.seatNumbers.join(', ')}</Typography>
         <Typography variant="body1" >Date: {new Date(confirmation.date).toDateString()}</Typography>
         <Button variant="contained" color="primary" onClick={closeConfirmation}>
           Close
         </Button>
       </div>
     </div>
      )}
    </div>
  );
};

export default Booking;
