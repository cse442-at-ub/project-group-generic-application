
//import React from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import React, { useState } from 'react';
import axios from 'axios';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  //const [userRole, setUserRole] = useState<string | null>(null); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Email and password can't be empty!");
      return;
    }

    const loginData = {
      email: email,
      password: password
    };

    axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/Loginbackend.php', loginData)
    .then(response => {
      if (response.data.includes('login_success!!!Student')) {
        alert('Login successful');
        //setUserRole('student');
        localStorage.setItem('userRole', 'student');
        setTimeout(() => {
          navigate('/profile');
      }, 2000);
      } else if (response.data.includes('login_success!!!Teacher')) {
        alert('Login successful');
        //setUserRole('teacher');
        localStorage.setItem('userRole', 'teacher');
        setTimeout(() => {
          navigate('/main');
        }, 2000);
      } else {
        alert('Login failed: ' + response.data);
      }
    });
  };

  return (
    <>
    <NavBar />
    <div className="mainDiv">
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login Required
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid alignItems="center" justifyContent="center" container>

              <Grid item>
                <Link href="#/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </div>
      </>
  )
}

export default LoginPage