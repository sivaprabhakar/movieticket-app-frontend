import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api/ApiService";
import MovieDetail from "./MovieDetail";

const Movies = () => {
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
      margin={"auto"}
      sx={{
        background:"#0f0d10",
        color: "white",
        paddingTop: "30px",
      }}
    >
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        sx={{
          background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
          color: "white",
          textAlign: "center",
        }}
      >
        All Movies
      </Typography>

      {loading && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <CircularProgress color="secondary" />
        </Box>
      )}

      {error && <Typography variant="h4" color="error">{error}</Typography>}
      {!loading && !error && (
        <Box
          width={"100%"}
          margin="auto"
          padding={6}
          display={"flex"}
          justifyContent="flex-start"
          flexWrap={"wrap"}
        >
          {movies.map((movie) => (
            <MovieDetail
              key={movie._id}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Movies;
