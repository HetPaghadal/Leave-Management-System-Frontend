import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const axios = require('axios');
const FormData = require('form-data');

const clientId = process.env.REACT_APP_CLIENT_KEY;

function Homepage() {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    const Auth = res.code;
    // console.log(Auth);

    const data = new FormData();
    data.append('code', Auth);
    data.append('client_id', clientId);
    data.append('client_secret', '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');
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
        // console.log(response.data.refresh_token);
      })
      .catch(function (error) {
        // console.log(error);
      });

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
