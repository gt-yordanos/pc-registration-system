import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SidebarProvider } from './Contexts/SidebarContext';
import MainLayout from './Components/Layout/MainLayout';
import Dashboard from './Pages/Dashboard';
import Settings from './Pages/Settings';
import Students from './pages/Students';
import Admins from './pages/Admins';
import Login from './pages/login'; 
import PrivateRoute from './Components/privateRoute'; // Import the PrivateRoute

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* All other routes use the MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route 
              path="dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="students" 
              element={
                <PrivateRoute>
                  <Students />
                </PrivateRoute>
              } 
            />
            <Route 
              path="admins" 
              element={
                <PrivateRoute>
                  <Admins />
                </PrivateRoute>
              } 
            />
            <Route 
              path="settings" 
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } 
            />
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
