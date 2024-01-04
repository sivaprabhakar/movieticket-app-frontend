import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Tabs, Tab } from "@mui/material";
import { getAllMovies } from "../api/ApiService";
import { Link } from "react-router-dom";
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { userActions } from '../store';
import { useDispatch } from 'react-redux';

function Header() {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
    dispatch(userActions.logout()); 
  };
  const tabsArray = [
    <Tab key="movies" LinkComponent={Link} to="/movies" label="Movies" />,
    !isUserLoggedIn && (
      <Tab key="signup" LinkComponent={Link} to="/signup" label="Signup" />
    ),
    isUserLoggedIn && (
      <Tab key="profile" LinkComponent={Link} to="/userprofile" label="Profile" />
    ),
    isUserLoggedIn && (
      <Tab
        key="logout"
        onClick={handleLogout}
        LinkComponent={Link}
        to="/"
        label="Logout"
      />
    ),
  ];

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar className="navbar">
          <Box position="relative" display="inline-block">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <span className="movie-icon-background"></span>
              <MovieCreationIcon className="movie-icon" style={{ fontSize: 60 }} />
            </Link>
          </Box>
          <Box className="search">
            <Autocomplete
              freeSolo
              options={movies && movies.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} placeholder="search" />}
            />
          </Box>
         
          <Tabs
    className="btns"
    textColor="inherit"
    indicatorColor="primary"
    value={value}
    onChange={(e, value) => setValue(value)}
  >
    {tabsArray.map((tab) => tab)}
  </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;