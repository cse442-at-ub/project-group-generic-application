import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Home, AccountCircle, EmojiPeople, Login, Assignment, School, Logout } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
//import UserFetch from '../components/UserFetch';

export default function ButtonAppBar() {
    // detect if mobile view
    let isMobile = window.screen.width <= 1000

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const userRole = localStorage.getItem('userRole');
    
    useEffect(() => {
        const fetchUser = async () => {
        try {
            const response = await axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/UserFetch.php', { withCredentials: true });
            if (response.data?.Username) {
            setIsLoggedIn(true);
            } else {
            setIsLoggedIn(false);
            }
        } catch (error) {
          setIsLoggedIn(false);
         }
      };
      
          fetchUser();
        }, [setIsLoggedIn]);
      
    const handleLogout = async () => {
        try {
            const response = await fetch('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/Logout.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({ signout: true }) // Include the 'signout' parameter
            });
        
            if (!response.ok) {
              throw new Error('Logout failed');
             // alert('Logout failed');
            }
            console.log('Logout successful');
            setIsLoggedIn(false);
            window.location.href = 'https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/#/login';
            alert('Logout successful');
          } catch (error) {
            console.error('Logout error:', error);
            alert('Logout error');
          }
    };
if (isLoggedIn == true) {
    if (isMobile) {
        return (
            <Box className="header" sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container spacing={2}>
                            <Grid item xs={2} sm={2}>
                                <Button color="inherit" component={Link} to="/"><Home /></Button>
                            </Grid>
                            {userRole == 'student' ? (
                            <Grid item xs={2} sm={2}>
                                <Button color="inherit" component={Link} to="/function"><EmojiPeople /></Button>
                            </Grid>
                            ) : (
                                <Grid item xs={2} sm={2}>
                                    <Button color="inherit" component={Link} to="/main"><School /></Button>
                                </Grid>
                            )}
                            {isLoggedIn ? (
                                <Grid item xs={2} sm={2}>
                                    <Button color="inherit" onClick={handleLogout}><Logout /></Button>
                                </Grid>
                            ) : (
                                <Grid item xs={2} sm={2}>
                                    <Button color="inherit" component={Link} to="/login"><Login /></Button>
                                </Grid>
                            )}
                            <Grid item xs={2} sm={2}>
                                <Button color="inherit" component={Link} to="/signup"><Assignment /></Button>
                            </Grid>
                            {userRole == 'student' ? (
                                <Grid item xs={2} sm={2}>
                                    <Button color="inherit" component={Link} to="/profile"><AccountCircle /></Button>
                                </Grid>
                            ) : (
                                <Grid></Grid>
                            )}
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
                            <Grid item xs={12} sm={2.4}>
                                <Button color="inherit" component={Link} to="/"><Home />&nbsp; Home</Button>
                            </Grid>
                            {userRole == 'student' ? (
                            <Grid item xs={12} sm={2.4}>
                                <Button color="inherit" component={Link} to="/function"><EmojiPeople />&nbsp; Attendance</Button>
                            </Grid>
                            ) : (
                                <Grid item xs={12} sm={2.4}>
                                    <Button color="inherit" component={Link} to="/main"><School />&nbsp; Professor Page</Button>
                                </Grid>
                            )}
                            {isLoggedIn ? (
                                <Grid item xs={12} sm={2.4}>
                                    <Button color="inherit" onClick={handleLogout}><Logout />&nbsp; Logout</Button>
                                </Grid>
                            ) : (
                                <Grid item xs={12} sm={2.4}>
                                    <Button color="inherit" component={Link} to="/login"><Login />&nbsp; Login</Button>
                                </Grid>
                            )}
                            <Grid item xs={12} sm={2.4}>
                                <Button color="inherit" component={Link} to="/signup"><Assignment />&nbsp; Signup</Button>
                            </Grid>
                            {userRole == 'student' ? (
                                <Grid item xs={12} sm={2.4}>
                                    <Button color="inherit" component={Link} to="/profile"><AccountCircle />&nbsp; Profile</Button>
                                </Grid>
                            ) : (
                                <Grid></Grid>
                            )}
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}
}
