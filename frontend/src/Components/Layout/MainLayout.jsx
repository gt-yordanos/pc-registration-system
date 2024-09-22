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
      {!isLoginPage && <Navbar />}
      <div className={`flex h-[87%] w-screen transition-all duration-300`}>
        {!isLoginPage && (
          <>
            {!isMobileView && <Sidebar />}
            <div className={`flex-1`}>
              <ContentSection selectedItem={selectedItem} isSidebarVisible={!isLoginPage && isSidebarVisible} />
            </div>
          </>
        )}

        {/* Show MobileMenu only if sidebar is hidden and on mobile view */}
        {!isLoginPage && isMobileView && (
          <MobileMenu />
        )}
      </div>
    </div>
  );
}

export default MainLayout;
