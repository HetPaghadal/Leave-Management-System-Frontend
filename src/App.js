import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import GoogleLogin from 'react-google-login';

import Login from './Component/Login';
import Display from './Component/Display';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/done" element={<Display />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
