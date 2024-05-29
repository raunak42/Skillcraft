"use client";

import React, { useState } from "react";

interface AccordionProps {
  title: string;
  content: React.ReactNode; // Accept any valid React element
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-white flex flex-col items-center gap-4 w-full overflow-hidden border rounded-md shadow-md transition-all duration-300 ease-in-out ${
        isOpen ? "h-[300px]" : "h-[66px] sm:h-[50px]"
      }`}
    >
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`${!isOpen && "h-full"} bg-gray-100 cursor-pointer flex flex-row items-start justify-between px-4 py-3  rounded-b-md   w-full  sm:items-start sm:justify-between rounded-t-md`}
      >
        <div className="w-[85%]" >{title}</div>
        <svg
          className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className=" flex flex-row items-center justify-center">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;
