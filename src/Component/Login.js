import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
// require('dotenv').config();

const clientId = process.env.REACT_APP_CLIENT_KEY;

function Login() {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    // console.log('Login Success:', res.profileObj);
    navigate('/done');
  };

  const onFailure = (res) => {
    // console.log('Login failed:', res);
  };

  return (
    <div>
      <h1>Welcome To Squadstack!</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        // isSignedIn={true}
      />
    </div>
  );
}

export default Login;
