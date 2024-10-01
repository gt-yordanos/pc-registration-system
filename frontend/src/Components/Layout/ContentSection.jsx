// ContentSection.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard'; 
import Students from '../../Pages/Students';
import Admins from '../../Pages/Admins';
import Settings from '../../Pages/Settings';

const ContentSection = () => {
  return (
    <div className="content-section flex-grow ml-1.5 mr-1.5 sm:ml-0 transition-all duration-300 h-[99%] overflow-auto rounded-lg no-scrollbar ">
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="admins" element={<Admins />} />
        <Route path="settings" element={<Settings />} />
        {/* Optionally add a default route */}
        <Route path="*" element={<Dashboard />} /> 
      </Routes>
    </div>
  );
};

export default ContentSection;
