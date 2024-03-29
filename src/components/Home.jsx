import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api/ApiService";
import MovieDetail from "../Movies/MovieDetail";
import { Carousel } from 'react-bootstrap';
import { Box, Button, Typography, CircularProgress } from "@mui/material";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setError("Error fetching movies. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      margin="0"
      padding="0"
      sx={{
        position: 'relative',
        background: "#0f0d10",
        color: "#fff",
      }}
    >
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          background="rgba(0, 0, 0, 0.7)"
          zIndex={999}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {error && <Typography variant="h4" color="error">{error}</Typography>}
      {!loading && !error && (
        <>
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
        </>
      )}
    </Box>
  );
};

export default Home;
