"use client";

import React, { useState } from "react";

interface AccordionProps {
  title: string;
  content: React.ReactNode; // Accept any valid React element
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full overflow-hidden border rounded-md shadow-md ">
      <button
        className={`bg-green-200 px-4 py-3  rounded-b-md transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-screen" : "h-[90px]"
        } w-full flex items-center justify-between px-4 py-3 bg-white rounded-t-md cursor-pointer transition-all duration-700 ease-in-out`}
        onClick={toggleAccordion}
      >
        <span className=" font-medium">{title}</span>
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
      </button>
      <div className="bg-white flex flex-row items-center justify-center">{isOpen && content}</div>
    </div>
  );
};

export default Accordion;
