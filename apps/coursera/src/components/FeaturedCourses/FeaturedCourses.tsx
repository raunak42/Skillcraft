import { BASE_URL_DEV } from "@/lib/constants";
import { ApiResponseAttributes, featuredCourses } from "types";
import { CourseCard } from "../Coursecard/CourseCard";
  
export const FeaturedCourses = async () => {
  const res = await fetch(`${BASE_URL_DEV}/api/getFeaturedCourses`, {
    cache: "no-store",
  });
  const response: ApiResponseAttributes = await res.json();
  const featuredCourses: featuredCourses[] = response.data
    ?.featuredCourses as featuredCourses[];

  if (!featuredCourses || featuredCourses.length === 0) {
    return <div>No courses available</div>
  }
  return (
    <div className="mt-[18px] sm:space-y-12 space-y-8 lg:px-[8px]">
      {featuredCourses.map((object, index) => (
        <div key={index} className="bg-gray-200">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-row items-center ">
              {/* <img src="line.svg" className="h-12 "></img> */}
              <div className="font-semibold md:text-xl">
                Courses in {object.category}
              </div>
            </div>
            <button className="flex flex-row items-center justify-between hover:bg-gray-200 rounded-lg ">
              <div className=" font-semibold ">View all</div>
              <img src="arrowRight.svg" className="w-8"></img>
            </button>
          </div>

          <div
            key={index}
            className="flex flex-row overflow-x-auto no-scrollbar space-x-4 mt-2"
          >
            {object.courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                imageLink={course.imageLink as string}
                description={course.description as string}
                price={course.price}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
