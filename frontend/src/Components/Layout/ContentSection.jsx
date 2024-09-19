import React from 'react';
import Dashboard from '../../Pages/Dashboard'; // Import your components
import Students from '../../Pages/Students';
import Admins from '../../Pages/Admins';
import Settings from '../../Pages/Settings';

const ContentSection = ({ selectedItem, isSidebarVisible }) => {
  const renderContent = () => {
    switch (selectedItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students />;
      case 'admins':
        return <Admins />;
      case 'settings':
        return <Settings />;
      default:
        return null; // Return null for empty static content
    }
  };

  return (
    <div
      className={`bg-red-300 w-full flex-grow transition-all duration-300 ${isSidebarVisible ? 'ml-64' : 'ml-0'} h-full overflow-auto`}
    >
      {renderContent()}
    </div>
  );
};

export default ContentSection;
