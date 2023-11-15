import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


import Grid from '@mui/material/Grid';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <Button color="inherit" component={Link} to="/">Home</Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button color="inherit" component={Link} to="/main">Main</Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button color="inherit" component={Link} to="/login">Login</Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button color="inherit" component={Link} to="/profile">Profile</Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button color="inherit" component={Link} to="/function">Function</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}