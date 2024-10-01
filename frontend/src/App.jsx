// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SidebarProvider } from './Contexts/SidebarContext';
import { LoginProvider } from './Contexts/LoginContext';
import { MobileMenuProvider } from './Contexts/MobileMenuContext';
import MainLayout from './Components/Layout/MainLayout';
import Login from './Pages/Login';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <LoginProvider>
      <SidebarProvider>
        <MobileMenuProvider>
          <Router>
            <Routes>
              {/* Login route */}
              <Route path="/login" element={<Login />} />

              {/* All other routes use MainLayout */}
              <Route path="/*" element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              } />
            </Routes>
          </Router>
        </MobileMenuProvider>
      </SidebarProvider>
    </LoginProvider>
  );
}

export default App;
