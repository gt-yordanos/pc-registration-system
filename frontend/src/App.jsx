import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext'; // Import SidebarProvider
import MainLayout from './MainLayout'; // Import MainLayout
import Dashboard from './components/Dashboard'; // Import your components
import Students from './components/Students'; // Import your components
import Admins from './components/Admins'; // Import your components
import Settings from './components/Settings'; // Import your components

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