import React from 'react';

import { Button, Container, Grid, TextField, Typography, Avatar, Box, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();

const StyledBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: 20,
  border: '2px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  padding: theme.spacing(4),
}));

export default function SignUp() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isSignup, setIsSignup] = React.useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userData = {
      name: isSignup ? formData.get('Name') || '' : '',
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try {
      const endpoint = isSignup ? '/user/signup' : '/user/login';
      const response = await axios.post(`http://localhost:8000${endpoint}`, userData);
    
      if (response.status === 200 || response.status === 201) {
        console.log(isSignup ? 'Signup successful!' : 'Login successful!');
    
        const { token, id } = response.data; // Assuming the user ID is returned as 'id'
    
        if (token) {
          console.log('Token received:', token);
          localStorage.setItem('token', token); // Store the token in local storage
        }
    
        if (id) {
          console.log('User ID received:', id);
          localStorage.setItem('userId', id); // Store the user ID in local storage
        }
    
        setIsAuthenticated(true);
        navigate('/');
        window.location.reload();
      } else {
        console.log(isSignup ? 'Signup failed!' : 'Login failed!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
     
      <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
        <StyledBox
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? 'Sign up' : 'Sign In'}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              mt: 3,
            }}
          >
            {isSignup && (
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  sx={{ mb: 3 }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Button 
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2" onClick={() => setIsSignup(!isSignup)} sx={{ cursor: 'pointer',color:"#000080", ":hover": {
                color: "#121217",
              }, }}>
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Typography>
              </Grid>
            </Grid>
          </Box>
        </StyledBox>
      </Container>
    </ThemeProvider>
  );
}