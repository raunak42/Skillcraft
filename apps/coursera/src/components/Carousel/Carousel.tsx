"use client";
import React, { useState } from "react";
import { PrismaCourseOutput } from "types";
import { CarouselCard } from "../CarouselCard/CarouselCard";

interface CarouselProps {
  courses: PrismaCourseOutput<{ select: {}; include: {} }>[];
}

export const Carousel: React.FC<CarouselProps> = ({ courses }) => {
  const [showAnimation, setShowAnimation] = useState<boolean>(true);

  setTimeout(() => {
    setShowAnimation(false)
  }, 2000);

  return (
    <div className="relative w-full h-full border-2 lg:px-2 rounded-xl ">
      <div className=" relative w-full h-full rounded-xl overflow-x-auto snap-x snap-mandatory flex flex-col items-center justify-center">
        <div
          className={`flex w-[100%] h-[99%] hover:cursor-pointer space-x-4  `}
        >
          {courses.map((course, index) => {
            return <CarouselCard course={course} key={index} />;
          })}
        </div>
        {showAnimation&&<div className="bg-gradient-radial from-transparent to-black rounded-xl w-[84px] h-[60px] md:w-56 md:h-40 flex flex-col items-center justify-center absolute">
          <img
            src="/scroll.svg"
            className="md:size-20 size-8 animate-bounce mr-[5%]"
          ></img>
        </div>}
      </div>

      {/*arrows*/}
      <div className="sm:hidden absolute bottom-[45%]">
        <img
          src="arrowPrev.svg"
          className=" size-6 sm:size-9 xl:size-11 hover:cursor-default"
        ></img>
      </div>
      <div className="sm:hidden absolute bottom-[45%] right-[1%]">
        <img
          src="arrowNext.svg"
          className=" size-6 sm:size-9 xl:size-11 hover:cursor-default"
        ></img>
      </div>
    </div>
  );
};

// export default Carousel;
