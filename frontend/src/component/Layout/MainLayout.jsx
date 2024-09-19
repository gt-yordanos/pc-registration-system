import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import { useSidebar } from './context/SidebarContext'; // Import the custom hook for Sidebar
import Navbar from './Navbar'; // Import Navbar
import Sidebar from './Sidebar'; // Import Sidebar

function MainLayout() {
  const { sideBarStatus } = useSidebar(); // Get sidebar status

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-[87%] w-screen transition-all duration-300">
        <Sidebar />
        <div className={p-8 flex-grow transition-all duration-300 ${sideBarStatus !== 'hidden' ? 'ml-64' : 'ml-0'}}>
          <Outlet /> {/* This will render the matched route's component */}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;