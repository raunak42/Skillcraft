'use client'
import { useState } from 'react';

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFirstButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`fixed left-0 h-full bg-[#ffffff] mt-[70px] z-10 border border-r-red-600 shadow-sm transition-all duration-300 ${
        isExpanded ? 'w-56' : 'w-16'
      }`}
    >
      <button
        className="w-full hover:bg-gray-200 h-16 flex flex-col justify-center items-center"
        onClick={handleFirstButtonClick}
      >
        <img src="arrowBarRight.svg" className="size-7" />
      </button>
      <button className="w-full hover:bg-gray-200 h-16 flex flex-col justify-center items-center">
        <img src="arrowBarRight.svg" className="size-7" />
      </button>
      <button className="w-full hover:bg-gray-200 h-16 flex flex-col justify-center items-center">
        <img src="arrowBarRight.svg" className="size-7" />
      </button>
      <button className="w-full hover:bg-gray-200 h-16 flex flex-col justify-center items-center">
        <img src="arrowBarRight.svg" className="size-7" />
      </button><button className="w-full hover:bg-gray-200 h-16 flex flex-col justify-center items-center">
        <img src="arrowBarRight.svg" className="size-7" />
      </button><button className="w-full hover:bg-gray-200 h-16 flex flex-col justify-center items-center">
        <img src="arrowBarRight.svg" className="size-7" />
      </button><button className="w-full hover:bg-gray-200 h-16 flex flex-col justify-center items-center">
        <img src="arrowBarRight.svg" className="size-7" />
      </button>
    </div>
  );
};