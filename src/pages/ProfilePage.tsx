import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ClassesFetcher from '../components/UserClass';
import PointsFetcher from '../components/UserPoint';
import UserFetch from '../components/UserFetch';
import AvatarFetch from '../components/Avatar';
import avatar1 from '../avatar/avatar1.png';
import avatar2 from '../avatar/avatar2.png';
import avatar3 from '../avatar/avatar3.png';
import avatar4 from '../avatar/avatar4.png';
import avatar5 from '../avatar/avatar5.png';
import avatar6 from '../avatar/avatar6.png';
import avatar7 from '../avatar/avatar7.png';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit the text color
    cursor: 'pointer', // Change cursor to pointer on hover
  };
  const [user, setUser] = useState({ Username: '' });
  const [open, setOpen] = useState(false);
  const [openPointShop, setOpenPointShop] = useState(false);
  const [classesJoined, setClassesJoined] = useState<string[]>([]);
  const [classToken, setClassToken] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const navigate = useNavigate();
  const [token, setToken] = useState<string>('');

  const [userAvatar, setUserAvatar] = useState<string | null>(localStorage.getItem('userAvatar'));
  useEffect(() => {
    if (userAvatar) {
      localStorage.setItem('userAvatar', userAvatar);
    } else {
      localStorage.removeItem('userAvatar');
    }
  }, [userAvatar]);

  const avatars = [
    { id: 1, image: avatar1, cost: 25 },
    { id: 2, image: avatar2, cost: 50 },
    { id: 3, image: avatar3, cost: 75 },
    { id: 4, image: avatar4, cost: 100 },
    { id: 5, image: avatar5, cost: 125 },
    { id: 6, image: avatar6, cost: 150 },
    { id: 7, image: avatar7, cost: 200 },
  ];

  const handleOpenPointShop = () => {
    setOpenPointShop(true);
  };

  const handleClosePointShop = () => {
    setOpenPointShop(false);
  };

  const handleSetUser = (userData: { Username: string }) => {
    setUser(userData);
  };

  const handleClassClick = (classToken: String) => {
    navigate('/function', { state: { classToken } });
  };

  const handleRedeemAvatar = async (avatarId: number) => {
    const selectedAvatar = avatars.find(avatar => avatar.id === avatarId);
    if (!selectedAvatar) {
      alert('Avatar not found.');
      return;
    }
    if (userPoints < selectedAvatar.cost) {
      alert('Not enough points to redeem this avatar.');
      return;
    }
  
    try {
      const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/PointsUpdate.php', {
        pointsToDeduct: selectedAvatar.cost
      });
  
      if (response.data.success) {
        await updateAvatarInDatabase(selectedAvatar.id);
        const updatedPoints = userPoints - selectedAvatar.cost;
        setUserPoints(updatedPoints);
        setUserAvatar(selectedAvatar.image);
        localStorage.setItem('userAvatar', selectedAvatar.image);
        alert(`Avatar ${selectedAvatar.id} redeemed successfully!`);
      } else {
        alert('Error redeeming avatar: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error during avatar redemption:', error);
      alert('An error occurred while redeeming the avatar.');
    }
  };

  const updateAvatarInDatabase = async (avatarId: number) => {
    const selectedAvatar = avatars.find(avatar => avatar.id === avatarId);
    if (!selectedAvatar) {
      console.error('Avatar not found for the given ID:', avatarId);
      return;
    } 
  
    try {
      const updateResponse = await axios.post(`https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/UserAvatar.php`, {
        username: user.Username,
        newAvatar: selectedAvatar.id
      });
  
      if (!updateResponse.data.success) {
        console.error('Error updating avatar in database:', updateResponse.data.error);
      }
    } catch (error) {
      console.error('Error during avatar update in database:', error);
    }
  }

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


//Functions for Downloading Attendance Records 
const [openDownload, setOpenDownload] = useState(false);

const handleOpenDownload = () => {
  setOpenDownload(true);
};

const handleCloseDownload = () => {
  setOpenDownload(false);
};

const handleDownload = async (token: String) => {
  try {
    const response = await axios.post(
      'https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/downloadAttendance.php',
      {
        class_code: token,
      },
      { responseType: 'blob' } 
    );

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'attendance_records.csv'; 
      document.body.appendChild(link);
      // Trigger a click on the link to start the download
      link.click();
      // Remove the link from the document
      document.body.removeChild(link);
    } else {
      alert('Error downloading attendance records');
    }
  } catch (error) {
    console.error('Error during attendance records download:', error);
    alert('An error occurred while downloading attendance records.');
  } finally {
    setClassToken('');
    handleCloseDownload();
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
                <Avatar
                  sx={{ width: 80, height: 80, bgcolor: 'secondary.main', mt: 2, mb: 2 }}
                  src={userAvatar || ''} 
                >
                  {!userAvatar && " "} 
                </Avatar>
                <Typography component="h1" variant="h6">
              
                </Typography>
                <Typography component="h1" variant="h6">
                  <UserFetch setUser={handleSetUser}/>
                  {user.Username && <p>{user.Username}</p>}
                </Typography>
                {/* Classes Joined */}
                <Typography component="h1" variant="h6">
                  Classes Joined:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', mt: 2 }}>
                  {classesJoined.map((className, idx) => (
                    <Link href="./#/function" key={idx} variant="body2" style={{ textDecoration: 'none' }}>
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
                <br></br>
                <button type="button" onClick={handleOpenPointShop} className="btn btn-success">Point shop</button>
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
                    onChange = {(e) => setToken(e.target.value)} />
                  <Box sx={{ mt: 2 }}>
                    <button
                      onClick={() => handleDownload(token)}
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
              <Modal open={openPointShop} onClose={handleClosePointShop}>
                <div style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  position: 'absolute',
                  width: '250px',
                  backgroundColor: '#F0F8FF',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                }}>
                  <h2 style={{ 
                    textAlign: 'center', 
                    color: '#333',
                    fontSize: '1.5em',
                    marginBottom: '30px'
                  }}>Point Shop</h2>
                  <PointsFetcher setUserPoints={setUserPoints} />
                  <div>Your points: {userPoints}</div>
                  <div style={{ marginBottom: '30px' }}>
                    {avatars.map(avatar => (
                      <div key={avatar.id} style={{ 
                        marginBottom: '20px',
                        textAlign: 'center',
                        width: '100%',
                      }}>
                        <img 
                          src={avatar.image} 
                          alt={`Avatar ${avatar.id}`} 
                          style={{ 
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%', 
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
                            marginBottom: '10px',
                          }} 
                        />
                        <p style={{
                          margin: '5px 0'
                        }}>{avatar.cost} Points</p>
                        <button
                          onClick={() => handleRedeemAvatar(avatar.id)}
                          style={{
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: '0.3s',
                            width: '100%',
                            fontSize: '0.9em',
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
                <AvatarFetch username={user.Username} setUserAvatar={setUserAvatar} />
                <Avatar
                  sx={{ width: isMobile ? 80 : 200, height: isMobile ? 80 : 200, bgcolor: 'secondary.main', border: '3px solid #000000', mt: 4, mb: 4 }}
                  src={userAvatar ?? ''}
                >
                  {/* If no avatar is selected, this text will show. You can replace it with any default text or icon. */}
                  {!userAvatar && " "} 
                </Avatar>
                <Typography component="h1" variant="h6">
                  <div>
                    {/*  <NameFetcher /> */}
                  </div>
                </Typography>
                <Typography component="h1" variant="h6">
                  <UserFetch setUser={handleSetUser}/>
                  {user.Username && <p>{user.Username}</p>}
                </Typography>
                {/* Classes Joined */}
                <Typography component="h1" variant="h6">
                  Classes Joined:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', mt: 2 }}>
                  <ClassesFetcher setClassesJoined={setClassesJoined} />
                  {classesJoined.map((className, idx) => (
                    <button key={idx} onClick={() => handleClassClick(className)} style={linkStyle}>
                      <Box sx={{
                        width: isMobile ? '80px' : '150px',
                        height: isMobile ? '80px' : '80px',
                        background: '#87CEFA',
                        border: isMobile ? '1px' : '2px solid white',
                        borderRadius: '30px'
                      }}>
                        {className}
                      </Box>
                    </button>
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
                    onChange={(e) => setToken(e.target.value)} />
                  <button
                    onClick={() => handleDownload(token)}
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
                top: isMobile ? '20%' : '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'absolute',
                width: isMobile ? '90%' : '400px',
                backgroundColor: '#F0F8FF',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                padding: isMobile ? '15px' : '20px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                zIndex: 1000,
              }}>
                  <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1rem' }}>Point Shop</h2>
                  <PointsFetcher setUserPoints={setUserPoints} />
                  <div style={{ fontSize: '1.1rem', margin: '1rem 0' }}>Your points: {userPoints}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                  {avatars.map(avatar => (
                    <div key={avatar.id} style={{ 
                      textAlign: 'center',
                      padding: '1rem',
                    }}>
                      <img 
                        src={avatar.image} 
                        alt={`Avatar ${avatar.id}`} 
                        style={{ 
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          marginBottom: '0.5rem',
                        }} 
                      />
                      <p>{avatar.cost} Points</p>
                      <button
                        onClick={() => handleRedeemAvatar(avatar.id)}
                        style={{
                          backgroundColor: '#4CAF50',
                          border: 'none',
                          color: 'white',
                          padding: '10px 20px',
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
