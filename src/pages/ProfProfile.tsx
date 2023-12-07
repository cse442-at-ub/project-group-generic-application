import { Modal, Button, TextField, Container, Typography, Grid, CssBaseline, Box } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import UserFetch from '../components/UserFetch';
import ClassesFetcher from '../components/CreatedClass';

interface Props {
  token1: string;
  setToken: Function;
}

const ProfProfile = ({token1, setToken}: Props) => {
  const [user, setUser] = useState({ Username: '' });
  const [openModal, setOpenModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [classesCreated, setClassesCreated] = useState<{ name: string, token: string }[]>([]);

  const handleSetUser = (userData: { Username: string }) => {
    setUser(userData);
  };

  const handleCreateClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newClassName.trim()) {
      alert("Please enter a class name.");
      return;
    }

    const token = Math.random().toString(36).substr(2, 8).toUpperCase();

    try {
      const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/ClassCreate.php', {
        username: user.Username,
        className: newClassName,
        token: token
      });
  
      if (response.data.success) {
        setClassesCreated(prevClasses => [...prevClasses, { name: newClassName, token: token }]);
        alert('Class created successfully with token: ' + token);
        setToken(token)
      } else {
        alert('Error creating class: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during API call:', error);
      alert('An error occurred while creating the class.');
    }
  
    setNewClassName('');
    setOpenModal(false);
  };

  const updateClassesCreated = (fetchedClasses: { classname: string, code: string }[]) => {
    const formattedClasses = fetchedClasses.map(classData => ({
      name: classData.classname,
      token: classData.code
    }));
    setClassesCreated(formattedClasses);
  };

//Functions for Downloading Attendance Records 
const [openDownload, setOpenDownload] = useState(false);

const handleOpenDownload = () => {
  setOpenDownload(true);
};

const handleCloseDownload = () => {
  setOpenDownload(false);
};

const handleDownload = async (token1: String) => {
  try {
    const response = await axios.post(
      'https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/downloadAttendance.php',
      {
        class_code: token1,
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
    setToken('');
    handleCloseDownload();
  }
};

  let isMobile = window.screen.width <= 1000;

  return (
    <>
        <h1 style={{fontSize:'2vh'}}>Current Attendance Token: {token1}</h1>
        <CssBaseline />
        <Container component="main" maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h1" variant="h6">
                <UserFetch setUser={handleSetUser}/>
                {user.Username && <p>{user.Username}</p>}
              </Typography>

                <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                  Create a Class
                </Button>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? '90%' : '400px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '8px',
                  }}>
                    <form onSubmit={handleCreateClass}>
                      <TextField
                        fullWidth
                        label="Class Name"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        margin="normal"
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Create Class
                      </Button>
                    </form>
                  </Box>
                </Modal>
                <Typography component="h1" variant="h6" sx={{ mt: 2 }}>
                  Classes Created: {classesCreated.length}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', mt: 2 }}>
                  <ClassesFetcher setClassesCreated={updateClassesCreated} />
                  {classesCreated.map((classItem, idx) => (
                    <Box key={idx} sx={{
                      width: isMobile ? '80px' : '150px',
                      height: isMobile ? '80px' : '80px',
                      background: '#87CEFA',
                      border: isMobile ? '1px' : '2px solid white',
                      borderRadius: '30px',
                      m: 1,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {classItem.name} (Token: {classItem.token})
                    </Box>
                  ))}
                </Box>
              </Box>
              <hr />
              <h1 style={{fontWeight:"bold", fontSize:'3vh'}}>Attendance Controls</h1>

              <br></br>
              <button type="button" onClick={handleOpenDownload} className="btn btn-success">Download Attendance Records</button>
              <br></br>
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
                    onClick={() => handleDownload(token1)}
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
            </Grid>
          </Grid>
        </Container>
    </>
  );
}

export default ProfProfile;