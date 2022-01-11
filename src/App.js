import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import GoogleLogin from 'react-google-login';

import Homepage from './Component/Homepage';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
