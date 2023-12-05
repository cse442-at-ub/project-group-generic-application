import { Modal, Button, TextField, Container, Typography, Grid, CssBaseline, Box } from '@mui/material';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import UserFetch from '../components/UserFetch';
import ClassesFetcher from '../components/CreatedClass';

const ProfProfile = () => {
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


  let isMobile = window.screen.width <= 1000;

  return (
    <>
      <NavBar />
      <div className="mainDiv">
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
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default ProfProfile;