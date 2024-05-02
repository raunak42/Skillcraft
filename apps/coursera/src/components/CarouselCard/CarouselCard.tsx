"use client"
import { PrismaCourseOutput } from "types";

interface CarouselCardProps {
  course: PrismaCourseOutput<{ include: { admin: true } }>;
}

export const CarouselCard: React.FC<CarouselCardProps> = async ({ course }) => {
  return (
    <div
    onClick={() => {
        window.location.assign(`/course/${course.id}`);
      }}
      key={course.id}
      className="relative w-full h-full shrink-0 snap-center rounded-xl overflow-hidden"
    >
      <img
        className="w-full h-full object-cover"
        src={course.imageLink as string}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="absolute xl:bottom-2 xl:left-4 xl:right-4 bottom-2 left-2 right-2 text-white flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <div className="font-bold text-2xl sm:text-3xl">{course.title}</div>
          <div className="md:font-semibold lg:px-[3px] px-[1px]">
            By {course.admin?.username}
          </div>
        </div>

        <div className="text-xl sm:font-semibold sm:text-2xl mt-2 flex flex-col justify-end">
          ₹{course.price}/-
        </div>
      </div>
    </div>
  );
};
