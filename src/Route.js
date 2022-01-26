import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './Component/Homepage';
import Dashboard from './Component/Dash';

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
