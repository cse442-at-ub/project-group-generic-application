import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import axios from 'axios';

function handleSubmit() {
  console.log("Hello World");
}

const ProfilePage = () => {
  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit the text color
    cursor: 'pointer', // Change cursor to pointer on hover
  };

  
  const [open, setOpen] = useState(false);
  const [classesJoined, setClassesJoined] = useState<string[]>([]);
  const [classToken, setClassToken] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinClass = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const joinClassInfo = {
      'classCode': classToken,
    };
    
  axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/JoinClassTest.php', joinClassInfo)
    .then(response => {
      const jsonResponse = JSON.parse(response.data.substring(response.data.indexOf('{')));
      console.log(response);
       if(jsonResponse.message === "Invalid class code") {
        alert('Invalid class code. Please try again.');
      } else if(jsonResponse.message === "Already in class") {
        alert('You are already in this class.');
      } else {
        setClassesJoined(prevClassesJoined => [...prevClassesJoined, classToken]);
      }
      
    })
    .catch(error => {
      console.error('Error', error);
    })
    .finally(() => {
      handleClose();
      setClassToken('');
    });
  };

//make a post request to the backend to download the attendance records
const [isLoading, setIsLoading] = useState(false);
const handleDownload = async () => {
  setIsLoading(true);
  const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/downloadAttendance.php');
  const downloadUrl = response.data.downloadUrl;
  window.open(downloadUrl, '_blank');
  setIsLoading(false);
}


  // detect if mobile view
  let isMobile = window.screen.width <= 1000

  if(isMobile) {
    return (
      <div className="mainDiv">
        <CssBaseline />
        <Container component="main" maxWidth="lg">
          <Grid container spacing={2}>
            {/* Sidebar */}
            <Grid item xs={12} sm={2}>
              <Box
                sx={{
                  borderRight: 1,
                  borderColor: 'divider',
                  padding: 2,
                  backgroundColor: 'darkgray',
                  height: '100%', // Set a fixed height to reach the bottom of the page
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Sidebar Items as hyperlinks */}
                <Link href="./" variant="body2" style={linkStyle}>
                  <Box sx={{ border: 0, padding: 1, margin: 1 }}>
                  <Typography component="h1" variant="h6">
                    Home Page
                  </Typography>
                  </Box>
                </Link>
                <Link href="./#/profile" variant="body2" style={linkStyle}>
                  <Box sx={{ border: 0, padding: 1, margin: 1 }}>
                  <Typography component="h1" variant="h6">
                    My Profile
                  </Typography>  
                  </Box>
                </Link>
                <Link href="./#/function" variant="body2" style={linkStyle}>
                  <Box sx={{ border: 0, padding: 1, margin: 1 }}>
                  <Typography component="h1" variant="h6">
                    Attendance
                  </Typography>   
                  </Box>
                </Link>
              </Box>
            </Grid>
  
            {/* Main Content */}
            <Grid item xs={12} sm={8}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxHeight: '80vh', // Set a fixed height to reach the bottom of the page
                }}
            
              >
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'secondary.main', mt: 2, mb: 2 }}>
              </Avatar>
                <Typography component="h1" variant="h6">
                  @Full Name
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  {/* Classes Joined */}
                  <Typography component="h1" variant="h6">
                    Classes Joined:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                    {classesJoined.map((className, idx) => (
                      <Link href="./#/main" key={idx} variant="body2" style={{ textDecoration: 'none' }}>
                        <Box
                          sx={{
                            width: isMobile ? '60px' : '180px',
                            height: isMobile ? '60px' : '180px',
                            background: 'red',
                            border: '3px solid white',
                            margin: isMobile ? '5px' : '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                          }}
                        >
                          <Typography variant="body2">{className}</Typography>
                        </Box>
                      </Link>
                    ))}
                  </Box>
                </Box>
                <br></br>
                <button type="button" onClick={handleOpen} className="btn btn-success">Join a class</button>
                <button type="button" onClick={handleDownload} className="btn btn-success" >Download Attendance Records</button>
              </Box>
              <Modal open={open} onClose={handleClose}>
              <Box sx={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'absolute',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
              }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Join a Class
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="classToken"
                  label="Enter Class Token"
                  name="classToken"
                  autoFocus
                  onChange={(e) => setClassToken(e.target.value)}
                />
                <Box sx={{ mt: 2 }}>
                  <button
                    onClick={handleJoinClass}
                    style={{
                      backgroundColor: 'green',
                      border: 'none',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: '0.3s',
                      marginTop: '16px',
                    }}
                  >
                    Join
                  </button>
                </Box>
              </Box>
            </Modal>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  } else {
    return (
    <div className="mainDiv">
      <CssBaseline />
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          {/* Sidebar */}
          <Grid item xs={12} sm={2}>
            <Box
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                padding: 2,
                backgroundColor: 'darkgray',
                height: '113%', // Set a fixed height to reach the bottom of the page
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Sidebar Items as hyperlinks */}
              <Link href="./" variant="body2" style={linkStyle}>
                <Box sx={{ border: 0, padding: 1, margin: 1 }}>
                <Typography component="h1" variant="h6">
                  Home Page
                </Typography>
                </Box>
              </Link>
              <Link href="./#/profile" variant="body2" style={linkStyle}>
                <Box sx={{ border: 0, padding: 1, margin: 1 }}>
                <Typography component="h1" variant="h6">
                  My Profile
                </Typography>  
                </Box>
              </Link>
              <Link href="./#/function" variant="body2" style={linkStyle}>
                <Box sx={{ border: 0, padding: 1, margin: 1 }}>
                <Typography component="h1" variant="h6">
                  Attendance
                </Typography>   
                </Box>
              </Link>
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} sm={10}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxHeight: '84vh', // Set a fixed height to reach the bottom of the page
              }}
          
            >
            <Avatar sx={{ width: 200, height: 200, bgcolor: 'secondary.main', mt: 4, mb: 4 }}>
            </Avatar>
              <Typography component="h1" variant="h6">
                @Full Name
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                  {/* Classes Joined */}
                  <Typography component="h1" variant="h6">
                    Classes Joined:
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    {classesJoined.map((className, idx) => (
                      <Link href="./#/main" key={idx} variant="body2" style={linkStyle}>
                        <Box sx={{ width: isMobile ? '80px' : '180px', height: isMobile ? '80px' : '180px', background: 'red', border: isMobile ? '3px' : '5px solid white' }}>
                          {className}
                        </Box>
                      </Link>
                    ))}
                  </Box>
                </Box>
                <br></br>
                <button type="button" onClick={handleOpen} className="btn btn-success">Join a class</button>
                <br></br>
                <button type="button" onClick={handleDownload} disabled={isLoading} className="btn btn-success" >Download Attendance Records</button>
              </Box>
              <Modal open={open} onClose={handleClose}>
                <div style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  position: 'absolute',
                  width: 400,
                  backgroundColor: '#AAC9F9',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: '20px',
                  borderRadius: '8px'
                }}>
                  <h2>Join a Class</h2>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="classToken"
                    label="Enter Class Token"
                    name="classToken"
                    onChange={(e) => setClassToken(e.target.value)}
                  />
                  <button
                    onClick={handleJoinClass}
                    style={{
                      backgroundColor: 'green',
                      border: 'none',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: '0.3s',
                    }}
                  >
                    Join
                  </button>
                </div>
              </Modal>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}}
  

export default ProfilePage;