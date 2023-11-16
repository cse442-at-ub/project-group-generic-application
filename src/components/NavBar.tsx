import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Home, AccountCircle, EmojiPeople, Login, Assignment, School } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
 
 
export default function ButtonAppBar() {
     // detect if mobile view
     let isMobile = window.screen.width <= 1000
 
     if (isMobile) {
        return (
            <Box className="header" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Grid container spacing={1}>
                    <Grid item xs={2} sm={2}>
                    <Button color="inherit" component={Link} to="/"><Home /></Button>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                    <Button color="inherit" component={Link} to="/main"><School /></Button>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                    <Button color="inherit" component={Link} to="/login"><Login /></Button>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                    <Button color="inherit" component={Link} to="/signup"><Assignment /></Button>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                    <Button color="inherit" component={Link} to="/profile"><AccountCircle /></Button>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                    <Button color="inherit" component={Link} to="/function"><EmojiPeople /></Button>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            </Box>
        )
     } else {
        return (
            <Box className="header" sx={{ flexGrow: 1 }}>
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
        )
     }
}