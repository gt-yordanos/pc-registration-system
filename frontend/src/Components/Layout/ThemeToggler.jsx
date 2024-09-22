import React, { useContext, useState } from 'react';
import { useTheme } from '../../Contexts/ThemeContext'; // Use custom hook instead of direct useContext

const ThemeToggler = () => {
  const { toggleTheme } = useTheme(); // Get the toggleTheme function from ThemeContext
  const [circlePosition, setCirclePosition] = useState('ml-[6%]');

  const handleTogglerClick = (event) => {
    const clickX = event.clientX - event.currentTarget.getBoundingClientRect().left;
    const togglerWidth = event.currentTarget.offsetWidth;
    const positionPercent = (clickX / togglerWidth) * 100;

    if (positionPercent < 33) {
      toggleTheme('light'); // Switch to light theme
      setCirclePosition('ml-[6%]'); // Circle position for light theme
    } else if (positionPercent < 66) {
      toggleTheme('dark'); // Switch to dark theme
      setCirclePosition('ml-[35%]'); // Circle position for dark theme
    } else {
      toggleTheme('current'); // Switch to system preferred theme
      setCirclePosition('ml-[64%]'); // Circle position for system preference
    }
  };

  return (
      <div className='flex gap-2 sm:gap-4'>
        <div className='text-white flex  items-center font-semibold'>THEME</div>
        <div className="theme-container flex flex-col items-center">
          <ul className="flex justify-between w-[48px] text-[#CCFFFF] text-sm">
            <li>1</li> {/* Light theme indicator */}
            <li>2</li> {/* Dark theme indicator */}
            <li>3</li> {/* System preference indicator */}
          </ul>
        <div className="relative bg-gray-300 h-[21px] w-[55px] rounded-full mt-1" onClick={handleTogglerClick}>
          <div className={`circle bg-pink-600 h-[16px] w-[16px] rounded-full absolute top-[2.5px] ${circlePosition} transition-all duration-200`}></div>
        </div>
      </div>
      </div>
    
  );
};

export default ThemeToggler;
