import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const clientId = process.env.REACT_APP_CLIENT_KEY;

function Homepage() {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    const Auth = res.code;
    // console.log(Auth);

    fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        code: Auth,
        client_id: clientId,
        client_secret: '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',
        redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code',
      }),
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
