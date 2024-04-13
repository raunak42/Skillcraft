"use client";
import React, { useEffect, useState } from "react";
import { ApiResponseAttributes, PrismaCourseOutput } from "types";

const Carousel: React.FC = () => {
  const [focus, setFocus] = useState(1);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const carouselWidth = e.currentTarget.offsetWidth;
    const scrollLeft = e.currentTarget.scrollLeft;
    const focusedIndex = Math.round(scrollLeft / carouselWidth) + 1;
    setFocus(focusedIndex);
  };

  const [topCourses, setTopCourses] = useState<PrismaCourseOutput<{}>[] | null>(
    null
  );

  async function fetchData() {
    const res = await fetch("/api/getTopCourses", { cache: "no-store" });
    const response: ApiResponseAttributes = await res.json();

    if (!response.data || !response.data.courses) {
      return;
    }
    const courses = response.data.courses;
    setTopCourses(courses);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!topCourses) {
    return <div>NO COURSES</div>;
  }

  return (
    <div>
      <div
        onScroll={handleScroll} // Attach onScroll directly
        className="relative w-[900px] border rounded-2xl overflow-hidden overflow-x-auto no-scrollbar snap-x snap-mandatory"
      >
        <div className="flex w-auto">
          {topCourses.map((course) => {
            return (
              <div className="relative w-[900px] h-[570px] shrink-0 snap-center">
                <img
                  className="w-full h-full object-cover"
                  src={course.imageLink as string}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <h1 className="absolute bottom-10 left-10 text-white font-bold text-4xl">
                  {course.title}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row mt-2">
        {[...Array(10)].map((_, i) => (
          <div className="size-6">
            {focus === i + 1 ? (
              <img className="" key={i} src="lineH.svg" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
