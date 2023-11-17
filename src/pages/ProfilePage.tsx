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
import NavBar from '../components/NavBar';
import ClassesFetcher from '../components/UserClass';
import avatar1 from '../avatar/avatar1.png'
import avatar2 from '../avatar/avatar2.png'


const ProfilePage = () => {
  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit the text color
    cursor: 'pointer', // Change cursor to pointer on hover
  };

  const [open, setOpen] = useState(false);
  const [openPointShop, setOpenPointShop] = useState(false);
  const [classesJoined, setClassesJoined] = useState<string[]>([]);
  const [classToken, setClassToken] = useState('');
  const [userPoints, setUserPoints] = useState(1000);
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('userAvatar') || '');
  const avatars = [
    { id: 1, image: avatar1, cost: 100 },
    { id: 2, image: avatar2, cost: 200 },
  ];

  const handleOpenPointShop = () => {
    setOpenPointShop(true);
  };

  const handleClosePointShop = () => {
    setOpenPointShop(false);
  };

  const handleRedeemAvatar = (avatarId:number) => {
    const selectedAvatar = avatars.find(avatar => avatar.id === avatarId);
    if (!selectedAvatar) {
      alert('Avatar not found.');
      return;
    }
    if (userPoints < selectedAvatar.cost) {
      alert('Not enough points to redeem this avatar.');
      return;
    }
    const updatedPoints = userPoints - selectedAvatar.cost;
    setUserPoints(updatedPoints);
    setUserAvatar(selectedAvatar.image);
    alert(`Avatar ${selectedAvatar.id} redeemed successfully!`);
    setUserAvatar(selectedAvatar.image);
    localStorage.setItem('userAvatar', selectedAvatar.image);
  };

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
      setClassesJoined(prevClassesJoined => [...prevClassesJoined, classToken]);
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


//Functions for Downloading Attendance Records 
const [openDownload, setOpenDownload] = useState(false);

const handleOpenDownload = () => {
  setOpenDownload(true);
};

const handleCloseDownload = () => {
  setOpenDownload(false);
};

const handleDownload = async () => {
  try {
    const response = await fetch('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/downloadAttendance.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ class_code: classToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to download attendance records');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading attendance records:', error);
  } finally {
    handleCloseDownload();
    setClassToken('');
  }
};


  // detect if mobile view
  let isMobile = window.screen.width <= 1000

  if(isMobile) {
    return (
      <><NavBar /><div className="mainDiv">
        <CssBaseline />
        <Container component="main" maxWidth="lg">
          <Grid container spacing={2}>
            {/* Main Content */}
            <Grid item xs={12} sm={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'secondary.main', mt: 2, mb: 2 }}>
                </Avatar>
                <Typography component="h1" variant="h6">
              
                </Typography>
                <Typography component="h1" variant="h6">
                  Email
                </Typography>
                {/* Classes Joined */}
                <Typography component="h1" variant="h6">
                  Classes Joined:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', mt: 2 }}>
                  {classesJoined.map((className, idx) => (
                    <Link href="./#/main" key={idx} variant="body2" style={{ textDecoration: 'none' }}>
                      <Box
                        sx={{
                          width: isMobile ? '60px' : '150px',
                          height: isMobile ? '60px' : '80px',
                          background: '#87CEFA',
                          border: '3px solid white',
                          margin: isMobile ? '5px' : '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '10px',
                        }}
                      >
                        <Typography variant="body2">{className}</Typography>
                      </Box>
                    </Link>
                  ))}
                </Box>
                <br></br>
                <button type="button" onClick={handleOpen} className="btn btn-success">Join a class</button>
                <br></br>
                <button type="button" onClick={handleOpenDownload} className="btn btn-success">Download Attendance Records</button>
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
                    onChange={(e) => setClassToken(e.target.value)} />
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
              <Modal open={openDownload} onClose={handleCloseDownload}>
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
                    Download Attendance Records
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="classToken"
                    label="Enter Class Token"
                    name="classToken"
                    onChange={(e) => setClassToken(e.target.value)} />
                  <Box sx={{ mt: 2 }}>
                    <button
                      onClick={handleDownload}
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
                      Download Record
                    </button>
                  </Box>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Container>
      </div></>
    );
  } else {
    return (
    <><NavBar /><div className="mainDiv">
        <CssBaseline />
        <Container component="main" maxWidth="lg">
          <Grid container spacing={2}>
            {/* Main Content */}
            <Grid item xs={12} sm={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{ width: isMobile ? 80 : 200, height: isMobile ? 80 : 200, bgcolor: 'secondary.main', mt: 2, mb: 2 }}
                  src={userAvatar}
                >
                  {/* If no avatar is selected, this text will show. You can replace it with any default text or icon. */}
                  {!userAvatar && "UA"} 
                </Avatar>
                <Typography component="h1" variant="h6">
                  <div>
                    {/*  <NameFetcher /> */}
                  </div>
                </Typography>
                <Typography component="h1" variant="h6">
                  Email
                </Typography>
                {/* Classes Joined */}
                <Typography component="h1" variant="h6">
                  Classes Joined:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', mt: 2 }}>
                  <ClassesFetcher setClassesJoined={setClassesJoined} />
                  {classesJoined.map((className, idx) => (
                    <Link href="./#/main" key={idx} variant="body2" style={linkStyle}>
                      <Box sx={{
                        width: isMobile ? '80px' : '150px',
                        height: isMobile ? '80px' : '80px',
                        background: '#87CEFA',
                        border: isMobile ? '1px' : '2px solid white',
                        borderRadius: '30px'
                      }}>
                        {className}
                      </Box>
                    </Link>
                  ))}
                </Box>
                <br></br>
                <button type="button" onClick={handleOpen} className="btn btn-success">Join a class</button>
                <br></br>
                <button type="button" onClick={handleOpenDownload} className="btn btn-success">Download Attendance Records</button>
                <br></br>
                <button type="button" onClick={handleOpenPointShop} className="btn btn-success">Point shop</button>
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
                    onChange={(e) => setClassToken(e.target.value)} />
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
              <Modal open={openDownload} onClose={handleCloseDownload}>
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
                  <h2>Download Attendance Records</h2>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="classToken"
                    label="Enter Class Token"
                    name="classToken"
                    onChange={(e) => setClassToken(e.target.value)} />
                  <button
                    onClick={handleDownload}
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
                    Download Record
                  </button>
                </div>
              </Modal>
              <Modal open={openPointShop} onClose={handleClosePointShop}>
                <div style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  position: 'absolute',
                  width: 400,
                  backgroundColor: '#F0F8FF',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                  padding: '20px',
                  borderRadius: '10px',
                }}>
                  <h2 style={{ textAlign: 'center', color: '#333' }}>Point Shop</h2>
                  <div style={{ marginTop: '20px' }}>
                    {avatars.map(avatar => (
                      <div key={avatar.id} style={{ marginBottom: '15px', textAlign: 'center' }}>
                        <img src={avatar.image} alt={`Avatar ${avatar.id}`} style={{ maxWidth: '100px', borderRadius: '50%' }} />
                        <p>{avatar.cost} Points</p>
                        <button
                          onClick={() => handleRedeemAvatar(avatar.id)}
                          style={{
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            color: 'white',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: '0.3s',
                          }}
                        >
                          Redeem
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Modal>
            </Grid>
          </Grid>
        </Container>
      </div></>
  );
}}
  

export default ProfilePage;
