import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function handleSubmit() {
  console.log("Hello World");
}

const ProfilePage = () => {
  return (
    <div className="mainDiv">
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Grid container spacing={2}>
          {/* Sidebar */}
          <Grid item xs={12} sm={4}>
            {/* Sidebar content goes here */}
            <Box
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                padding: 2,
              }}
            >
              <Typography component="h2" variant="h6">
                Sidebar Content
              </Typography>
              {/* Add your sidebar content here */}
            </Box>
          </Grid>
          
          {/* Main Content */}
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h6">
                @Full Name
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  label="Email"
                  name="code"
                  autoComplete="code"
                  autoFocus
                />
                <Grid container>
                  <Grid item xs>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Class 1"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ProfilePage;
