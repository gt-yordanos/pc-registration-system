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

  // Determine selected item based on the current path
  const selectedItem = location.pathname.split('/').pop() || 'dashboard'; // Default to 'dashboard'

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex h-[87%] w-screen transition-all duration-300">
        <Sidebar />
        <ContentSection selectedItem={selectedItem} isSidebarVisible={sideBarStatus !== 'visible'} />
      </div>
    </div>
  );
}

export default MainLayout;
