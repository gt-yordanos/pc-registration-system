import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ContentSection from "./ContentSection"; // Import your ContentSection
import { useSidebar } from "../../Contexts/SidebarContext"; // Correct path
import { useLocation } from "react-router-dom";

function MainLayout() {
  const { sideBarStatus } = useSidebar(); // Get sidebar status
  const location = useLocation(); // Get current location

  // Determine if the current page is login (don't show sidebar for login page)
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

  // Determine selected item based on the current path
  const selectedItem = location.pathname.split('/').pop() || 'dashboard'; // Default to 'dashboard'

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Show Navbar only if not on login page */}
      {!isLoginPage && <Navbar />}
      
      <div className={`flex h-[87%] w-screen transition-all duration-300 ${isLoginPage ? 'justify-center' : ''}`}>
        {/* Only show Sidebar if not on login page */}
        {!isLoginPage && <Sidebar />}
        <ContentSection selectedItem={selectedItem} isSidebarVisible={sideBarStatus !== 'visible'} />
      </div>
    </div>
  );
}

export default MainLayout;
