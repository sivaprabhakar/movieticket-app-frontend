import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api/ApiService";
import MovieDetail from "../Movies/MovieDetail";
import { Carousel } from 'react-bootstrap';
import { Box, Button, Typography } from "@mui/material";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      margin="0"
      padding="0"
      sx={{
        background: "#0f0d10", 
        color: "#fff", 
      }}
    >
      <Box margin="auto" width="80%" height={"40vh"} padding={2}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://image.tmdb.org/t/p/w500//8Pko2qvw6g21Sw1V2dDwJZ25F7c.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://image.tmdb.org/t/p/w500/oHBc4GCO9sAr1c7lxGvelKnW1zu.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://image.tmdb.org/t/p/w500/hr9rjR3J0xBBKmlJ4n3gHId9ccx.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign="center">
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin="auto"
        display="flex"
        width="80%"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies.slice(0, 4).map((movie, index) => (
            <MovieDetail
              id={movie._id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              key={index}
            />
          ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          component={Link}
          to="/movies"
          variant="outlined"
          sx={{
            margin: "auto",
            color: "#fff",
            border: "2px solid #fff",
            borderRadius: "8px",
            padding: "10px 20px",
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#2c3e50",
            },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
