import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';

const FunctionPage = () => {
  const [code, setCode] = useState('');
  const location = useLocation();
  const classToken = location.state?.classToken || 'DEFAULT_TOKEN';

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
          <Typography style={{ fontWeight: "bold", fontSize: 30}} component="h1" variant="h6">
            Look up at Professor Screen for Code
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
              onChange={(e) => setcode(e.target.value)}
            />
             <button style={{ fontSize: 20}} className="button-5" role="button">Join</button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Having problems? Contact Us"}
                </Link>
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