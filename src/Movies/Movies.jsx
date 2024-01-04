import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api/ApiService";
import MovieDetail from "./MovieDetail";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log("Fetched movies:", data.movies); 
        setMovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
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
    </Box>
  );
};

export default Movies;