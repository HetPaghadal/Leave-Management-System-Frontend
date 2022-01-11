import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const clientId = process.env.REACT_APP_CLIENT_KEY;

function Homepage() {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    navigate('/Dashboard');
  };

  const onFailure = (res) => {};

  return (
    <div>
      <h1>Welcome To Squadstack Leave Tracker!</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default Homepage;
