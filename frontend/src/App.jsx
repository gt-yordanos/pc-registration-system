import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Students from './Students';
import Admins from './Admins';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/admins" element={<Admins />} />
      </Routes>
    </Router>
  );
};

export default App;
