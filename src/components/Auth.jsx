import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store";
import SignUp from "./SignUp";
import { sendUserAuthRequest } from "../api/ApiService";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (data) => {
    try {
      const response = await sendUserAuthRequest(data, data.signup);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        dispatch(userActions.login());
        navigate("/");
      } else {
        console.log(data.signup ? "Signup failed!" : "Login failed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <SignUp onSubmit={handleFormSubmit} />;
};

export default Auth;
