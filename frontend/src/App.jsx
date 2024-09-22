import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SidebarProvider } from './Contexts/SidebarContext';
import { LoginProvider } from './Contexts/LoginContext'; // Add LoginProvider here
import { MobileMenuProvider } from './Contexts/MobileMenuContext'; // Import MobileMenuProvider
import MainLayout from './Components/Layout/MainLayout';
import Dashboard from './Pages/Dashboard';
import Settings from './Pages/Settings';
import Students from './Pages/Students';
import Admins from './Pages/Admins';
import Login from './Pages/Login'; 
import Signup from './Pages/Signup';

function App() {
  return (
      <LoginProvider>
      <SidebarProvider>
        <MobileMenuProvider> {/* Wrap in MobileMenuProvider */}
          <Router>
            <Routes>
              {/* Login and Signup routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* All other routes use the MainLayout */}
              <Route path="/" element={<MainLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="students" element={<Students />} />
                <Route path="admins" element={<Admins />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </Router>
        </MobileMenuProvider>
      </SidebarProvider>
    </LoginProvider>
    
  );
}

export default App;
