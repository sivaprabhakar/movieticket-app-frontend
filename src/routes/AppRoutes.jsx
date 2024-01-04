import React from 'react'
import {Routes,Route } from 'react-router-dom'
import SignUp from '../components/SignUp'
import Home from '../components/Home'
import User from '../components/User'
import Movies from '../Movies/Movies'
import UserProfile from '../components/UserProfile'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../store'
import Booking from '../components/Booking'

function AppRoutes() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userActions.login());
    }
    },[dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/user" element={<User />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/userprofile"   element={<UserProfile />} />
      <Route path="/booking/:id"   element={<Booking />} />
      
        
      
     
    </Routes>
  );
}

export default AppRoutes