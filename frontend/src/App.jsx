import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SidebarProvider } from './Contexts/SidebarContext';
import MainLayout from './Components/Layout/MainLayout';
import Dashboard from './Pages/Dashboard';
import Settings from './Pages/Settings';
import Students from './Pages/Students';
import Admins from './Pages/Admins';

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="admins" element={<Admins />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
