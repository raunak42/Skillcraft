"use client";
import { useState } from "react";

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFirstButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`fixed left-0 h-full bg-[#ffffff] mt-[70px] z-10 border-[2px] border-r-[#ED2647] shadow-sm transition-all duration-300 ease-liner ${
        isExpanded ? "w-56" : "w-16"
      }`}
    >
      <button
        className="w-full hover:bg-gray-200 h-16 flex flex-col justify-center items-center transition-all"
        onClick={handleFirstButtonClick}
      >
        {isExpanded ? (
          <img src="arrowBarLeft.svg" className="size-7 ml-auto mr-2" />
        ) : (
          <img src="arrowBarRight.svg" className="size-7" />
        )}
      </button>
    </div>
  );
};
