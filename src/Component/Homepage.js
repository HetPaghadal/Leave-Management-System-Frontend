import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const axios = require('axios');
const FormData = require('form-data');

const clientId = process.env.REACT_APP_CLIENT_KEY;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
let ref;

function Homepage() {
  function CheckAccesstoken(accessToken) {
    const URL = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;
    let res = 0;
    fetch(URL).then((response) => {
      // console.log(response.status);
      if (true) res = 1;
    });
    return res;
  }
  const GenerateAccesstoken = (refreshToken) => {
    const data = new FormData();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
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
        // console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const navigate = useNavigate();
  const onSuccess = (res) => {
    const Auth = res.code;
    // console.log(Auth);

    const data = new FormData();
    data.append('code', Auth);
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
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

    axios(config)
      .then(function (response) {
        ref =
          'ya29.A0ARrdaM-zhvpTcrVbeavwTN_789fi6Yi0LxZoxNK-ZiAi9xFUBp6Ku0Vi-wgLyjtSEICiIQ1JG5UP2MswOfuw00FAKt7-Ywu4a73VREwL2InThm3NxYLD5NuhEGqGg-IbuVGY_jADwdwOvmevmK5Z7U1Cm7sI';
        // console.log(CheckAccesstoken(ref));
      })
      .catch(function (error) {});
    navigate('/Dashboard');
  };

  const onFailure = (res) => {};

  return (
    <div>
      <h1>Welcome To Squadstack Leave Tracker!</h1>
      <GoogleLogin
        clientId={clientId}
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
