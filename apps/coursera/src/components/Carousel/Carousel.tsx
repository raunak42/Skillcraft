import React from "react";
import { ApiResponseAttributes } from "types";
import { BASE_URL_DEV } from "@/lib/constants";
import { CarouselCard } from "../CarouselCard/CarouselCard";

export const Carousel: React.FC = async () => {
  const res = await fetch(`${BASE_URL_DEV}/api/getTopCourses`, {
    cache: "default",
  });
  const response: ApiResponseAttributes = await res.json();

  const topCourses = response.data?.courses;
  if (!topCourses) {
    return <div>No courses available.</div>;
  }

  return (
    <div className="relative w-full h-full border-2 lg:px-2 rounded-xl ">
      <div className="w-full h-full rounded-xl overflow-x-auto snap-x snap-mandatory flex flex-col items-center justify-center">
        <div className="flex w-[100%] h-[99%] hover:cursor-pointer space-x-4 ">
          {topCourses.map((course,index) => {
            return <CarouselCard course={course} key={index} />;
          })}
        </div>
      </div>

      {/*arrows*/}
      <div className="absolute bottom-[46%]">
        <img
          src="arrowPrev.svg"
          className=" size-6 sm:size-9 xl:size-11 hover:cursor-default"
        ></img>
      </div>
      <div className="absolute bottom-[45%] right-[0%] animate-bounce">
        <img
          src="arrowNext.svg"
          className=" size-6 sm:size-9 xl:size-11 hover:cursor-default"
        ></img>
      </div>
    </div>
  );
};

// export default Carousel;
