"use client";
import React, { useState } from "react";

interface AccordionProps {
  title: string;
  content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center w-full overflow-hidden border rounded-md shadow-md">
      <div
        onClick={toggleAccordion}
        className="bg-gray-100 h-[50px] cursor-pointer flex flex-row items-center justify-between w-full rounded-t-md px-4"
      >
        <div className="w-[85%] ">{title}</div>
        <svg
          className={` w-6 h-6 transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
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
      <div
        className={`
          transition-all duration-500 ease-in-out overflow-hidden flex flex-col items-center justify-center
          ${isOpen ? "max-h-[1000px] py-4" : "max-h-0 py-0"}
        `}
      >
        <div className=" px-4 flex flex-col items-center justify-center">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
