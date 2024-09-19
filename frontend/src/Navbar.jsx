import React from 'react';
import { useSidebar } from './SidebarContext';
import computerIcon from './assets/laptop-minimalistic-svgrepo-com.svg';
import ProfileIcon from './assets/profile-svgrepo-com.svg';
import closeIcon from './assets/bx-x.svg';
import menuIcon from './assets/bx-menu.svg';

const Navbar = () => {
  const { sideBarStatus, toggleSidebar } = useSidebar(); 
  return (
    <div className='bg-[#000F1F] w-screen h-[13%] border-b-4 border-[#00AED9]  flex items-center justify-between px-4'>
      
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
          <div className='bg-[#CCFFFF] w-12 h-12 rounded-xl flex items-center justify-center'>
            <img src={computerIcon} className='w-8' alt="Computer Icon" />
          </div>
          <h1 className='text-[#CCFFFF] font-bold text-2xl'>PC Registration System</h1>
        </div>
       
      </div>

      
      <div className='bg-[#2a89a9] w-12 h-12 rounded-full flex items-center justify-center'>
        <img src={ProfileIcon} className='w-10' alt="Profile Icon" />
      </div>

    </div>
  );
};

export default Navbar;