import React from "react";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MovieDetail = ({ title, releaseDate, posterUrl, id }) => {
  console.log("Received props:", id, posterUrl, releaseDate, title);
  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding shadow for hover effect
        },
        background: "rgba(255, 255, 255, 0.1)", // Adjust alpha value for transparency
        backdropFilter: "blur(10px)", // Adding blur effect
        color: "white",
      }}
    >
      <img height={"50%"} width="100%" src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" style={{ color: "white" }}> {/* Set text color to white */}
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to={`/booking/${id}`}
          onClick={() => console.log("Movie ID for booking:", id)}
          sx={{
            margin: "auto",
            background: "#e11c15", // Set the background color to #e11c15
            borderRadius: "8px",
            color: "white",
            ":hover": {
              background: "#e11c15", // Set the hover background color to #e11c15
            },
          }}
          size="small"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieDetail;
