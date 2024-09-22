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
          
          {/* Protect the MainLayout itself */}
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            {/* All nested routes are automatically protected */}
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
