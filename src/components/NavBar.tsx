import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Home, AccountCircle, EmojiPeople, Login, Assignment, School, Logout } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
//import { useState } from 'react';
//import UserFetch from '../components/UserFetch';

export default function ButtonAppBar() {
    // detect if mobile view
    let isMobile = window.screen.width <= 1000

    let isLoggedIn = false; // Replace with login logic // if true, show logout button // if false, show login button


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
                            {isLoggedIn ? (
                                <Grid item xs={2} sm={2}>
                                    <Button color="inherit" component={Link} to="/logout"><Logout /></Button>
                                </Grid>
                            ) : (
                                <Grid item xs={2} sm={2}>
                                    <Button color="inherit" component={Link} to="/login"><Login /></Button>
                                </Grid>
                            )}
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
                                <Button color="inherit" component={Link} to="/"><Home />&nbsp; Home</Button>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button color="inherit" component={Link} to="/main"><School />&nbsp; Main</Button>
                            </Grid>
                            {isLoggedIn ? (
                                <Grid item xs={12} sm={2}>
                                    <Button color="inherit" component={Link} to="/logout"><Logout />&nbsp; Logout</Button>
                                </Grid>
                            ) : (
                                <Grid item xs={12} sm={2}>
                                    <Button color="inherit" component={Link} to="/login"><Login />&nbsp; Login</Button>
                                </Grid>
                            )}
                            <Grid item xs={12} sm={2}>
                                <Button color="inherit" component={Link} to="/signup"><Assignment />&nbsp; Signup</Button>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button color="inherit" component={Link} to="/profile"><AccountCircle />&nbsp; Profile</Button>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button color="inherit" component={Link} to="/function"><EmojiPeople />&nbsp; Function</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}
