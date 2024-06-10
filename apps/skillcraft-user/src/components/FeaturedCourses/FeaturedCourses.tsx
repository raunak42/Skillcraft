import { BASE_URL } from "@/lib/constants";
import { ApiResponseAttributes, featuredCourses } from "types";
import { CourseCard } from "../Coursecard/CourseCard";
import { ViewAllButton } from "./ViewAllButton";
import { SmallCarousel } from "./SmallCarousel";
import { FCSkeleton } from "./FCSkeleton";

export const FeaturedCourses = async () => {
  const res = await fetch(`${BASE_URL}/api/getFeaturedCourses`, {
    cache: "no-store",
  });
  const response: ApiResponseAttributes = await res.json();
  const featuredCourses: featuredCourses[] = response.data
    ?.featuredCourses as featuredCourses[];

  if(!featuredCourses){
    return<div className="mt-[15px]" ><FCSkeleton/></div>
  }
  if (featuredCourses.length === 0) {
    return <div>No courses available</div>;
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
              <ViewAllButton query={object.category as string} />
            </button>
          </div>

          <SmallCarousel object={object}/>
        </div>
      ))}
    </div>
  );
};
