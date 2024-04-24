import React from "react";
import { ApiResponseAttributes } from "types";
import { BASE_URL_DEV } from "@/lib/constants";

export const Carousel: React.FC = async () => {
  const res = await fetch(`${BASE_URL_DEV}/api/getTopCourses`, {
    cache: "default"
  });
  const response: ApiResponseAttributes = await res.json();

  const topCourses = response.data?.courses;
  if (!topCourses) {
    return<div>No courses available.</div>
  }

  return (
    <div className="relative w-full h-full border-2 lg:px-2 rounded-xl ">
      <div className="w-full h-full rounded-xl overflow-x-auto snap-x snap-mandatory flex flex-col items-center justify-center">
        <div className="flex w-[100%] h-[99%] hover:cursor-pointer space-x-4 ">
          {topCourses.map((course) => {
            return (
              <div
                key={course.id}
                className="relative w-full h-full shrink-0 snap-center rounded-xl overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover"
                  src={course.imageLink as string}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute xl:bottom-2 xl:left-4 xl:right-4 bottom-2 left-2 right-2 text-white flex flex-row justify-between items-center">
                  <div className="font-bold text-2xl sm:text-3xl">
                    {course.title}
                  </div>
                  <div className="text-xl sm:font-semibold sm:text-2xl mt-2 flex flex-col justify-end">
                    ₹{course.price}/-
                  </div>
                </div>
              </div>
            );
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
