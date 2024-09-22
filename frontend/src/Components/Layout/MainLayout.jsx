import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import ContentSection from "./ContentSection";
import { useSidebar } from "../../Contexts/SidebarContext";

function MainLayout() {
  const { isSidebarVisible } = useSidebar();
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';
  const selectedItem = location.pathname.split('/').pop() || 'dashboard';

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Only render Navbar when not on login/signup pages */}
      {!isLoginPage && <Navbar />}
      <div className={`flex h-[87%] w-screen transition-all duration-300`}>
        {!isLoginPage && (
          <>
            {/* Sidebar for desktop view */}
            {!isMobileView && <Sidebar />}
            <div className={`flex-1`}>
              {/* Main content section */}
              <ContentSection selectedItem={selectedItem} isSidebarVisible={!isLoginPage && isSidebarVisible} />
            </div>
          </>
        )}

        {/* Show MobileMenu only on mobile view and when not on login/signup pages */}
        {!isLoginPage && isMobileView && (
          <MobileMenu />
        )}
      </div>
    </div>
  );
}

export default MainLayout;
