import React, { useState } from 'react';
import { useSidebar } from '../../Contexts/SidebarContext';
import computerIcon from '../../assets/laptop-minimalistic-svgrepo-com.svg';
import ProfileIcon from '../../assets/profile-svgrepo-com.svg';
import closeIcon from '../../assets/bx-x.svg';
import menuIcon from '../../assets/bx-menu.svg';

const Navbar = () => {
  const { sideBarStatus, toggleSidebar } = useSidebar(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for toggling dropdown
  const [username, setUsername] = useState('John Doe'); // Example username, this would normally come from authentication

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Toggle dropdown to show logout option if logged in
      setDropdownOpen(!dropdownOpen);
    } else {
      // Redirect to login if not logged in
      window.location.href = '/login';
    }
  };

  const handleLogout = () => {
    // Logic for logging out (e.g., clearing tokens)
    setIsLoggedIn(false);
    setDropdownOpen(false); // Close the dropdown after logout
    console.log("Logged out");
  };

  return (
    <div className='bg-[#001F3D] w-[99%] h-[13%] flex items-center justify-between px-4 mb-2 mx-auto mt-2 rounded-lg'>
      
      <div className='flex items-center gap-10 sm:gap-0'>
        <div className="bg-white h-10 w-10 flex items-center justify-center cursor-pointer rounded-full sm:hidden">
          <img
            src={sideBarStatus === 'hidden' ? menuIcon : closeIcon}
            alt="Menu Toggle Icon"
            className="w-9"
            onClick={toggleSidebar}
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          <div className='bg-[#CCFFFF] h-8 w-8 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center'>
            <img src={computerIcon} className='w-6 sm:w-8' alt="Computer Icon" />
          </div>
          <h1 className='text-[#CCFFFF] font-bold text-lg sm:text-2xl '>PC Registration System</h1>
        </div>
      </div>

      <div className='relative flex items-center'>
        <div className='bg-[#2a89a9] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer'>
          <img 
            src={ProfileIcon} 
            className='w-8 sm:w-10' 
            alt="Profile Icon" 
            onClick={handleLoginLogout}
          />
        </div>

        {/* Conditionally show username or login */}
        {isLoggedIn ? (
          <div className='ml-3 cursor-pointer text-white' onClick={handleLoginLogout}>
            {username}
          </div>
        ) : (
          <div className='ml-3 cursor-pointer text-white' onClick={handleLoginLogout}>
            Login
          </div>
        )}

        {/* Dropdown for Logout */}
        {dropdownOpen && isLoggedIn && (
          <div className="absolute top-12 right-0 bg-white text-black rounded-md shadow-lg p-2">
            <button onClick={handleLogout} className="w-full text-left p-2 hover:bg-gray-200">Logout</button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;
