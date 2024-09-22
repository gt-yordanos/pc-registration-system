import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../Contexts/SidebarContext';
import { useMobileMenu } from '../../Contexts/MobileMenuContext';
import dashboardIcon from '../../assets/bxs-dashboard.svg';
import studentsIcon from '../../assets/student-person-part-2-svgrepo-com.svg';
import adminsIcon from '../../assets/manager-avatar-svgrepo-com.svg';
import settingsIcon from '../../assets/bxs-cog.svg';
import { BiX } from 'react-icons/bi'; // Import close icon

const MobileMenu = () => {
  const { selectedItem, handleItemSelect } = useSidebar();
  const { isMobileMenuVisible, toggleMobileMenu } = useMobileMenu();

  const handleLinkClick = (item) => {
    handleItemSelect(item);
  };

  // Icon mapping for easier management
  const icons = {
    dashboard: dashboardIcon,
    students: studentsIcon,
    admins: adminsIcon,
    settings: settingsIcon,
  };

  return (
    isMobileMenuVisible && ( // Only render if mobile menu is visible
      <div className='absolute top-8 inset-0 flex flex-col justify-center  items-center bg-[#000F1F] z-50 w-[75%] h-[80%] mx-auto my-auto sm:hidden border-2 border-[#00AED9] rounded-lg'>
        <ul className='flex flex-col  space-y-1'>
          {['dashboard', 'students', 'admins', 'settings'].map((item) => (
            <li key={item} className=''>
              <Link
                to={`/${item}`}
                className={`flex items-center w-52 gap-5 p-2 rounded-lg text-center ${selectedItem === item ? 'bg-[#005F8F] ' : ''}`}
                onClick={() => handleLinkClick(item)} // Handle click
              >
                <img
                  src={icons[item]}
                  alt={`${item} Icon`}
                  className='w-10 p-1 bg-[#CCFFFF] rounded-lg'
                />
                <span className='text-[#CCFFFF] text-xl'>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default MobileMenu;
