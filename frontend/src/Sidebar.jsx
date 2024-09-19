import React, { createContext, useState, useContext } from 'react';

// Create the context
const SidebarContext = createContext();

// Create a provider component
export const SidebarProvider = ({ children }) => {
  const [sideBarStatus, setSideBarStatus] = useState('visible');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setSideBarStatus(prevStatus => (prevStatus === 'hidden' ? 'visible' : 'hidden'));
  };

  // Function to collapse/expand the sidebar
  const toggleCollapse = () => {
    setIsCollapsed(prevState => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ sideBarStatus, toggleSidebar, isCollapsed, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Create a custom hook to use the SidebarContext
export const useSidebar = () => {
  return useContext(SidebarContext);
};