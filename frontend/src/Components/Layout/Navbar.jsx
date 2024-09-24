import React, { useEffect, useState } from 'react';
import { useSidebar } from '../../Contexts/SidebarContext';
import computerIcon from '../../assets/laptop-minimalistic-svgrepo-com.svg';
import ProfileIcon from '../../assets/profile-svgrepo-com.svg';
import ProfileCard from './ProfileCard';
import ThemeToggler from './ThemeToggler'; // Import the ThemeToggler
import closeIcon from '../../assets/laptop-minimalistic-svgrepo-com.svg';

const Navbar = () => {
  const { sideBarStatus, toggleSidebar } = useSidebar(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setDropdownOpen(!dropdownOpen);
    } else {
      window.location.href = '/login';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username from local storage
    localStorage.removeItem('profilePic'); // Clear profile picture from local storage
    setIsLoggedIn(false);
    setDropdownOpen(false);
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <div className='bg-[#000F1F] w-screen h-[13%] border-b-4 border-[#00AED9] flex items-center justify-between px-4'>
      <div className='flex items-center gap-10 sm:gap-0'>
        <div className="bg-white h-10 w-10 flex items-center justify-center cursor-pointer rounded-full sm:hidden">
          <img
            src={sideBarStatus === 'hidden' ? menuIcon : closeIcon}
            alt="Menu Toggle Icon"
            className="w-9"
            onClick={toggleSidebar}
          />
        </div>

        {/* System logo */}
        <div className="flex justify-center items-center gap-3">
          <div className='bg-[#CCFFFF] h-8 w-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center'>
            <img src={computerIcon} className='w-6 sm:w-8' alt="Computer Icon" />
          </div>
          <h1 className='text-[#CCFFFF] font-bold text-sm sm:text-2xl'>PC Registration System</h1>
        </div>
      </div>

      <div className='relative flex items-center'>
        <div className='bg-[#2a89a9] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer'>
          {profilePic ? (
            <img 
              src={profilePic} 
              className='w-10 rounded-full' 
              alt="Profile" 
              onClick={handleLoginLogout}
            />
          ) : (
            <img 
              src={ProfileIcon} 
              className='w-10' 
              alt="Profile Icon" 
              onClick={handleLoginLogout}
            />
          )}
        </div>

        {isLoggedIn ? (
          <div className='ml-3 cursor-pointer text-white' onClick={handleLoginLogout}>
            {username}
          </div>
        ) : (
          <div className='ml-3 cursor-pointer text-white' onClick={handleLoginLogout}>
            Login
          </div>
        )}

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
