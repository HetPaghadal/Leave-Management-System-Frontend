import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const logout = (res) => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div>
      <h1>Login Successfully</h1>
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_KEY}
        buttonText="Logout"
        onLogoutSuccess={logout}
      />
    </div>
  );
}

export default Dashboard;
