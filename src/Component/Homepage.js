import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image1 from './images/signupposter2.png';
import Squad from './images/Squadstackround.png';

const axios = require('axios');
const FormData = require('form-data');

function Homepage() {
  const navigate = useNavigate();
  // Check AccessToken is valid or not
  // async function CheckAccesstoken(Acccess_Token) {
  //   const URL = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${Acccess_Token}`;
  //   const res = await fetch(URL);
  //   return res.ok;
  // }

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
      .then(async (response) => {
        localStorage.setItem('Access_Token', response.data.access_token);
        localStorage.setItem('Gen_Date', new Date().getTime());
      })
      .catch(() => {
        localStorage.clear();
        navigate('/');
      });
  }

  // Generate RefreshToken Using AuthCode
  async function GenerateRefreshToken(AuthCode) {
    let data = new FormData();
    data.append('code', AuthCode);
    data.append('client_id', process.env.REACT_APP_CLIENT_KEY);
    data.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', 'http://localhost:3000');

    let config = {
      method: 'post',
      url: 'https://oauth2.googleapis.com/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    await axios(config)
      .then(async (response) => {
        localStorage.setItem('Access_Token', response.data.access_token);
        localStorage.setItem('Refresh_Token', response.data.refresh_token);
        localStorage.setItem('Gen_Date', new Date().getTime());
      })
      .catch(() => {
        localStorage.clear();
        navigate('/');
      });

    const Access_Token = localStorage.getItem('Access_Token');

    await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${Access_Token}`,
    )
      .then((response) => response.json())
      .then(async (response) => {
        localStorage.setItem('first_name', response.given_name);
        localStorage.setItem('last_name', response.family_name);
        localStorage.setItem('email', response.email);

        data = new FormData();
        data.append('first_name', localStorage.getItem('first_name'));
        data.append('last_name', localStorage.getItem('last_name'));
        data.append('username', localStorage.getItem('first_name'));
        data.append('email', localStorage.getItem('email'));

        config = {
          method: 'post',
          url: 'http://127.0.0.1:8000/employees/employees/',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data,
        };

        await axios(config)
          .then(async (res) => {
            localStorage.setItem('user_id', res.data.detail.id);
            localStorage.setItem('django_Token', res.data.Token);
          })
          .catch(() => {
            navigate('/');
          });
      });
  }

  // After Successfully Login
  const onSuccess = async (res) => {
    const Auth = res.code;
    await GenerateRefreshToken(Auth);

    navigate('/dashboard');
  };

  const onFailure = () => {};

  useEffect(() => {
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
        <Grid
          container
          component="main"
          sx={{
            height: '100vh',
            width: '100%',
            backgroundColor: '#feeae6',
          }}
        >
          <CssBaseline />

          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              display: 'flex',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#feeae6',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div sx={{ display: 'flex', justifycontent: 'left' }}>
              <img src={Image1} alt="Hurre" height="570" width="1000" />
            </div>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src={Squad} alt="Squadlogo" />
              <Typography
                component="h1"
                variant="h5"
                style={{ 'text-align': 'center' }}
              >
                Welcome to
                <br />
                Leave management tracker!
              </Typography>

              <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_KEY}
                buttonText="Login with Google"
                accessType="offline"
                responseType="code"
                prompt="consent"
                onSuccess={onSuccess}
                onFailure={onFailure}
              />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default Homepage;
