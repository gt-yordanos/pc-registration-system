import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SidebarProvider } from './Contexts/SidebarContext';
import { LoginProvider } from './Contexts/LoginContext'; // Add LoginProvider here
import { MobileMenuProvider } from './Contexts/MobileMenuContext'; // Import MobileMenuProvider
import MainLayout from './Components/Layout/MainLayout';
import Dashboard from './Pages/Dashboard';
import Settings from './Pages/Settings';
import Students from './pages/Students';
import Admins from './Pages/Admins';
import Login from './Pages/Login';

function App() {
  return (
    <LoginProvider>
      <SidebarProvider>
        <MobileMenuProvider> {/* Wrap in MobileMenuProvider */}
          <Router>
            <Routes>
              {/* Login and Signup routes */}
              <Route path="/login" element={<Login />} />

              {/* All other routes use the MainLayout */}
              <Route path="/" element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>}>
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
