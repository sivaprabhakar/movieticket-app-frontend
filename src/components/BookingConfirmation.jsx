import React ,{useState} from 'react';
import { Box, Typography,IconButton  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BookingConfirmation = ({ movie, selectedSeats, date }) => {
    const [showConfirmation, setShowConfirmation] = useState(true);

    const handleClose = () => {
      setShowConfirmation(false);
    };
  return (
    <Box
      bgcolor="#ffffff"
      color="#000000"
      padding="20px"
      display="block"
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
      borderRadius="5px"
      zIndex="1000"
    >
        <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '5px',
              right: '5px',
            }}
          >
            <CloseIcon />
          </IconButton>
      <Typography variant="h5" marginBottom="20px">
        Ticket Booked Successfully
      </Typography>
      <Typography variant="body1" marginBottom="10px">
        Movie: {movie?.title}
      </Typography>
      <Typography variant="body1" marginBottom="10px">
        Seats: {selectedSeats.join(', ')}
      </Typography>
      <Typography variant="body1" marginBottom="10px">
        Date: {date}
      </Typography>
    </Box>
  );
};

export default BookingConfirmation;
