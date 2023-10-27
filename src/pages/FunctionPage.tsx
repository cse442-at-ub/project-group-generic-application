import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import React, { useState } from 'react';

const FunctionPage = () => {
  const [code, setcode] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
        code,
    });

    const attendCode = {
        'code': code,
    };
    
    axios.post('http://localhost:3000/FunctionBackend.php', attendCode)
        .then(response => {
            console.log('Data submitted successful', response.data);
        })
        .catch(error => {
            console.error('Error submitting data', error);
        });
  };

  return (
    <>
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
          <Typography component="h1" variant="h6">
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
  )
}

export default FunctionPage