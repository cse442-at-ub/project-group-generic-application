import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { NewReleases, School } from '@mui/icons-material';

const FunctionPage = () => {
  const [code, setCode] = useState('');
  const location = useLocation();
  const classToken = location.state?.classToken || 'DEFAULT_TOKEN';
  const [points, setPoints] = useState(1000);


  function incrementPoints() {
    setPoints(points+100)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
        code,
        classToken,
    });

    const codeRegex = /^[A-Za-z0-9]+$/;

    if (!codeRegex.test(code)) {
      alert('Only capital, lowercase letters and numbers are allowed');
      return;
    }

    const attendanceCode = {
      'code': code,
      'classToken': classToken,
    };
    
    axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/attendanceinput.php', attendanceCode)
        .then(response => {
            console.log('Data submitted successfully', response.data);
        })
        .catch(error => {
            console.error('Error submitting data', error);
        });
  };

  return (
    <>
    <NavBar />
    <div className="mainDiv">
    <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography style={{ fontWeight: "bold", fontSize: 10}} variant="h3">
          <School /> 
          </Typography>
          <Typography style={{ fontWeight: "bold", fontSize: 15}} component="h1" variant="h6">
          Check Your Professor's Screen for The Code
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
               margin="normal"
              required
              fullWidth
              id="code"
              label="Attendance code"
              name="code"
              autoComplete="code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
             <button style={{ fontSize: 20}} className="button-5" role="button" onClick={incrementPoints}>Join</button>
            <Grid container>
              <Grid item xs>
                <br></br>
              <Typography style={{ fontSize: 12, padding:"2vh"}} component="h1" variant="h6">
          <NewReleases /> &nbsp; Attendance Points: <b>{points}</b>
          </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </div>
    </>
  );
};

export default FunctionPage;