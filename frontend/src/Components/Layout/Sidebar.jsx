import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { useSidebar } from '../../Contexts/SidebarContext';
import dashboardIcon from '../../assets/bxs-dashboard.svg';
import studentsIcon from '../../assets/student-person-part-2-svgrepo-com.svg';
import adminsIcon from '../../assets/manager-avatar-svgrepo-com.svg';
import settingsIcon from '../../assets/bxs-cog.svg';
import minimizeIcon from '../../assets/minimize-svgrepo-com.svg';
import maximizeIcon from '../../assets/maximize-svgrepo-com.svg'; 

const Sidebar = () => {
  const { sideBarStatus, isCollapsed, toggleCollapse, selectedItem, handleItemSelect } = useSidebar();
  const location = useLocation();

  // Effect to set the selected item based on the current path
  useEffect(() => {
    const path = location.pathname.split('/').pop(); // Get the last part of the path
    handleItemSelect(path || 'dashboard'); // Default to 'dashboard' if no path
  }, [location, handleItemSelect]);

  return (
    <div
      className={`h-full bg-[#000F1F] transition-all duration-300 
        ${sideBarStatus === 'hidden' ? 'w-0' : isCollapsed ? 'w-24 pt-4 border-r-4 border-[#00AED9]' : 'pt-4 w-64 border-r-4 border-[#00AED9]'}`}
    >
      {/* Minimize/Maximize button */}
      <div className='flex w-full justify-end pr-4 mb-10'>
        <div className='w-10 h-10 flex items-center justify-center bg-white rounded-xl cursor-pointer' onClick={toggleCollapse}>
          <img src={isCollapsed ? maximizeIcon : minimizeIcon} className='w-8' alt="Toggle Collapse" />
        </div>
      </div>

      {/* Sidebar items */}
      <ul className={`flex flex-col gap-4 p-4 transition-opacity duration-300 ${sideBarStatus === 'hidden' ? 'opacity-0' : 'opacity-100'}`}>
        <li>
          <Link 
            to="dashboard" 
            className={`cursor-pointer flex items-center gap-3 w-full p-2 rounded-lg transition-colors duration-300 
              ${selectedItem === 'dashboard' ? 'border-2 border-white' : ''}`} 
            onClick={() => handleItemSelect('dashboard')}
          >
            <div className="bg-[#005F8F] p-1 rounded-lg flex items-center justify-center w-10 h-10">
              <img src={dashboardIcon} alt="Dashboard" className="w-8 h-8" />
            </div>
            {!isCollapsed && <p className="bg-[#005F8F] text-[#CCFFFF] p-2 text-center rounded-lg w-[70%]">Dashboard</p>}
          </Link>
        </li>
        <li>
          <Link 
            to="students" 
            className={`cursor-pointer flex items-center gap-3 w-full p-2 rounded-lg transition-colors duration-300 
              ${selectedItem === 'students' ? 'border-2 border-white' : ''}`} 
            onClick={() => handleItemSelect('students')}
          >
            <div className="bg-[#005F8F] p-1 rounded-lg flex items-center justify-center w-10 h-10">
              <img src={studentsIcon} alt="Students" className="w-8 h-8" />
            </div>
            {!isCollapsed && <p className="bg-[#005F8F] text-[#CCFFFF] p-2 text-center rounded-lg w-[70%]">Students</p>}
          </Link>
        </li>
        <li>
          <Link 
            to="admins" 
            className={`cursor-pointer flex items-center gap-3 w-full p-2 rounded-lg transition-colors duration-300 
              ${selectedItem === 'admins' ? 'border-2 border-white' : ''}`} 
            onClick={() => handleItemSelect('admins')}
          >
            <div className="bg-[#005F8F] p-1 rounded-lg flex items-center justify-center w-10 h-10">
              <img src={adminsIcon} alt="Admins" className="w-8 h-8" />
            </div>
            {!isCollapsed && <p className="bg-[#005F8F] text-[#CCFFFF] p-2 text-center rounded-lg w-[70%]">Admins</p>}
          </Link>
        </li>
        <li>
          <Link 
            to="settings" 
            className={`cursor-pointer flex items-center gap-3 w-full p-2 rounded-lg transition-colors duration-300 
              ${selectedItem === 'settings' ? 'border-2 border-white' : ''}`} 
            onClick={() => handleItemSelect('settings')}
          >
            <div className="bg-[#005F8F] p-1 rounded-lg flex items-center justify-center w-10 h-10">
              <img src={settingsIcon} alt="Settings" className="w-10 h-10" />
            </div>
            {!isCollapsed && <p className="bg-[#005F8F] text-[#CCFFFF] p-2 text-center rounded-lg w-[70%]">Settings</p>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
