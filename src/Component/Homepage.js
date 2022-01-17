import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

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
  function GenerateAccesstoken(refreshToken) {
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

    axios(config)
      .then(function (response) {
        localStorage.setItem('Access_Token', response.access_token);
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
      .then(function (response) {
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
    const Sec = new Date().getTime - localStorage.getItem('Gen_Date');

    if (Sec >= 3500000) {
      chk = false;
    }

    if (!chk) {
      GenerateAccesstoken(Refresh_Token);
    }
    navigate('/Dashboard');
  });

  return (
    <div>
      <h1>Welcome To Squadstack Leave Tracker!</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_KEY}
        buttonText="Login with Google"
        accessType="offline"
        responseType="code"
        prompt="consent"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default Homepage;
