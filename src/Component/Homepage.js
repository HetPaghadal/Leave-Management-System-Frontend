import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const axios = require('axios');
const FormData = require('form-data');

function Homepage() {
  const navigate = useNavigate();

  // Check AccessToken is valid or not
  async function CheckAccesstoken(Acccess_Token) {
    const URL = `${process.env.REACT_APP_TOKENINFO_API}access_token=${Acccess_Token}`;
    const res = await fetch(URL);
    return res.ok;
  }

  // Generate Accesstoken using Refreshtoken
  async function GenerateAccesstoken(refreshToken) {
    const data = new FormData();
    data.append('client_id', process.env.REACT_APP_CLIENT_KEY);
    data.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
    data.append('refresh_token', refreshToken);
    data.append('grant_type', 'refresh_token');

    const config = {
      method: 'post',
      url: 'https://oauth2.googleapis.com/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    await axios(config)
      .then(async function (response) {
        localStorage.setItem('Access_Token', response.data.access_token);
        localStorage.setItem('Gen_Date', new Date().getTime());
      })
      .catch(function () {
        localStorage.clear();
        navigate('/');
      });
  }

  // Generate RefreshToken Using AuthCode
  async function GenerateRefreshToken(AuthCode) {
    const data = new FormData();
    data.append('code', AuthCode);
    data.append('client_id', process.env.REACT_APP_CLIENT_KEY);
    data.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', 'http://localhost:3000');

    const config = {
      method: 'post',
      url: 'https://oauth2.googleapis.com/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    await axios(config)
      .then(async function (response) {
        localStorage.setItem('Access_Token', response.data.access_token);
        localStorage.setItem('Refresh_Token', response.data.refresh_token);
        localStorage.setItem('Gen_Date', new Date().getTime());
      })
      .catch(function () {
        localStorage.clear();
        navigate('/');
      });
  }

  // After Successfully Login
  const onSuccess = (res) => {
    const Auth = res.code;
    GenerateRefreshToken(Auth);
    navigate('/Dashboard');
  };

  const onFailure = () => {};
  useEffect(() => {
    const Access_Token = localStorage.getItem('Access_Token');
    const Refresh_Token = localStorage.getItem('Refresh_Token');
    if (Refresh_Token == null) {
      return;
    }

    let chk = true;
    const Sec = new Date().getTime() - localStorage.getItem('Gen_Date');

    if (Sec >= 3500000) {
      chk = false;
    }

    if (!chk) {
      GenerateAccesstoken(Refresh_Token);
    }

    navigate('/Dashboard');
  });

  const theme = createTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random) ',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Welcome to Leave management tracker!
              </Typography>
              <img
                src="S:\Intern_OBP\Leave-Management-System-Frontend\src\Component\signupposter2.png"
                alt="Flowers in Chania"
              />
              <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_KEY}
                buttonText="Login with Google"
                accessType="offline"
                responseType="code"
                prompt="consent"
                onSuccess={onSuccess}
                onFailure={onFailure}
              />
              {/* <Box sx={{ mt: 1 }}>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default Homepage;
