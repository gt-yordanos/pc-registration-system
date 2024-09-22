import React, { useState } from 'react';
import { useLogin } from '../../Contexts/LoginContext';
import { useMobileMenu } from '../../Contexts/MobileMenuContext'; // Import MobileMenu context
import { BiMenu, BiX } from 'react-icons/bi';
import computerIcon from '../../assets/laptop-minimalistic-svgrepo-com.svg';
import ProfileIcon from '../../assets/profile-svgrepo-com.svg';
import ProfileCard from './ProfileCard';
import ThemeToggler from './ThemeToggler'; // Import the ThemeToggler

const Navbar = () => {
  const { user, logout } = useLogin();
  const { isMobileMenuVisible, toggleMobileMenu } = useMobileMenu(); // Use MobileMenu context
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className='bg-[#001F3D] w-[98%] sm:w-[99%] h-[13%] flex items-center justify-between px-4 mb-2 mx-auto mt-2 rounded-lg relative'>
      <div className='flex items-center gap-5'>
        {/* Menu icon for smaller screens */}
        <div className="bg-white w-8 h-8 sm:hidden flex items-center justify-center cursor-pointer rounded-full" onClick={toggleMobileMenu}>
          {isMobileMenuVisible ? (
            <BiX className="w-6 h-6 text-black" />
          ) : (
            <BiMenu className="w-6 h-6 text-black" />
          )}
        </div>

        {/* System logo */}
        <div className="flex justify-center items-center gap-3">
          <div className='bg-[#CCFFFF] h-8 w-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center'>
            <img src={computerIcon} className='w-6 sm:w-8' alt="Computer Icon" />
          </div>
          <h1 className='text-[#CCFFFF] font-bold text-sm sm:text-2xl'>PC Registration System</h1>
        </div>
      </div>

      {/* Profile icon and Popup */}
      <div className='relative flex items-center gap-10'>

      <div className='hidden sm:flex justify-center items-center'>
        <ThemeToggler />
      </div>

        <div className='w-8 h-8 sm:w-12 sm:h-12 bg-[#CCFFFF] flex items-center justify-center rounded-full'>
          <img
            src={ProfileIcon}
            alt="Profile Icon"
            className="w-6 sm:w-8 cursor-pointer"
            onClick={handleProfileClick}
          />
          {isProfileOpen && (
            <ProfileCard user={user} onLogout={logout} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
