import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

function handleSubmit() {
  console.log("Hello World");
}

const ProfilePage = () => {
  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit the text color
    cursor: 'pointer', // Change cursor to pointer on hover
  };

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
                height: '113.5%', // Set a fixed height to reach the bottom of the page
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Sidebar Items as hyperlinks */}
              <Link href="/" variant="body2" style={linkStyle}>
                <Box sx={{ border: 0, padding: 1, margin: 1 }}>
                <Typography component="h1" variant="h6">
                  Home Page
                </Typography>
                </Box>
              </Link>
              <Link href="/profile" variant="body2" style={linkStyle}>
                <Box sx={{ border: 0, padding: 1, margin: 1 }}>
                <Typography component="h1" variant="h6">
                  My Profile
                </Typography>  
                </Box>
              </Link>
              <Link href="/function" variant="body2" style={linkStyle}>
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
                minHeight: '80vh', // Set a fixed height to reach the bottom of the page
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
                  <Link href="/main" variant="body2" style={linkStyle}>
                    <Box sx={{ width: '200px', height: '200px', background: 'red', border: '5px solid white' }}>
                      Class 1
                    </Box>
                  </Link>
                  <Link href="/main" variant="body2" style={linkStyle}>
                    <Box sx={{ width: '200px', height: '200px', background: 'blue', border: '5px solid white' }}>
                      Class 2
                    </Box>
                  </Link>
                  <Link href="/main" variant="body2" style={linkStyle}>
                    <Box sx={{ width: '200px', height: '200px', background: 'green', border: '5px solid white' }}>
                      Class 3
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ProfilePage;






