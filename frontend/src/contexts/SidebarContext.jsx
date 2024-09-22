import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('dashboard');

  // Toggle sidebar visibility (for mobile screens)
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Toggle sidebar collapse (for larger screens)
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Set the selected sidebar item
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsSidebarVisible(false); // Hide sidebar when an item is selected
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarVisible,
        toggleSidebar,
        isCollapsed,
        toggleCollapse,
        selectedItem,
        handleItemSelect,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
