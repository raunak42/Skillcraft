import Carousel from "@/components/Carousel/Carousel";
import { CourseCardHz } from "@/components/CourseCardHz/CourseCardHz";
import { CourseCard } from "@/components/Coursecard/CourseCard";
import { VCarousel } from "@/components/VCarousel/VCarousel";
import { BASE_URL_DEV } from "@/lib/constants";
import {
  ApiResponseAttributes,
  PrismaCourseOutput,
  featuredCourses,
} from "types";

export default async function Page() {
  const res = await fetch(`${BASE_URL_DEV}/api/getFeaturedCourses`, {
    cache: "no-store",
  });
  const response: ApiResponseAttributes = await res.json();
  const featuredCourses: featuredCourses[] = response.data
    ?.featuredCourses as featuredCourses[];

  if (!featuredCourses || featuredCourses.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <div>
      <div className="mt-4 flex flex-row items-center space-x-2">
        <img src="line.svg" className="h-12"></img>
        <div className="flex flex-row items-center">
          <h1 className="text-2xl font-bold">Top</h1>
          <h1 className="text-2xl font-bold text-[#EA3A36]">10</h1>
        </div>
        <h1 className="text-2xl font-bold">Bestsellers</h1>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <Carousel />
        </div>
        <div className="col-span-1 mt-[-23px]">
          <div className="text-s flex flex-row ml-4">
            <div className=" text-[#EA3A36] font-semibold">#</div>
            <div className=" text-black font-semibold">Top</div>
            <div className=" text-[#EA3A36] font-semibold">10</div>
          </div>
          <VCarousel />
        </div>
      </div>
      {featuredCourses.map((object, index) => (
        <div key={index} className="">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <img src="line.svg" className="h-12"></img>
              <div className="font-semibold">Courses in {object.category}</div>
            </div>

            <button className="flex flex-row items-center hover:bg-gray-200 p-2 rounded-lg mr-4">
              <div className="text-xs font-semibold">View all</div>
              <img src="arrowRight.svg" className="w-4"></img>
            </button>
          </div>

          <div
            key={index}
            className="flex flex-row py-1 overflow-x-auto no-scrollbar space-x-4 mb-8"
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
}
