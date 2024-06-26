import { BASE_URL } from "@/lib/constants";
import { CourseCardHz } from "../CourseCardHz/CourseCardHz";
import { ApiResponseAttributes, PrismaCourseOutput } from "types";

interface VCarouselProps {
  courses: PrismaCourseOutput<{ select: {}; include: {} }>[]
}

export const VCarousel: React.FC<VCarouselProps> = async ({courses}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthNumber = new Date().getMonth();
  const month = months[monthNumber];
  const year = new Date().getFullYear();

  return (
    <div className="w-full h-full space-y-2 overflow-y-auto rounded-3xl border-black">
      <div className="text-black px-[18px] mb-[-4px] flex flex-row justify-between">
        <h2>Top #10 Trending</h2>
        <h2>
          {month} | {year}
        </h2>
      </div>
      {courses.map((course) => {
        return (
          <CourseCardHz
            key={course.id}
            title={course.title as string}
            imageLink={course.imageLink as string}
            description={course.description as string}
            price={course.price as number}
            id={course.id as number}
          />
        );
      })}
    </div>
  );
};
