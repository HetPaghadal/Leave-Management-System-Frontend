import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './Homepage';
import Dashboard from './Dashboard';

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
