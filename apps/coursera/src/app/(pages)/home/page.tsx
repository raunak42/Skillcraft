import { Carousel } from "@/components/Carousel/Carousel";
import { FeaturedCourses } from "@/components/FeaturedCourses/FeaturedCourses";
import { VCarousel } from "@/components/VCarousel/VCarousel";
import { BASE_URL_DEV } from "@/lib/constants";
import { ApiResponseAttributes } from "types";

export default async function Page() {
  const res = await fetch(`${BASE_URL_DEV}/api/getTopCourses`, {
    cache: "default",
  });
  const response: ApiResponseAttributes = await res.json();

  const topCourses = response.data?.courses;
  if (!topCourses) {
    return <div>No courses available.</div>;
  }

  return (
    <div>
      <div className="w-full h-full grid lg:grid-cols-3 grid-cols-1  ">
        <div className="relative lg:col-span-2 flex flex-col items-center justify-center lg:pr-2">
          <div className="lg:w-full w-full h-[260px] sm:h-[380px] md:h-[486px]  xl:h-[608px] transition-all duration-300 ease-in-out">
            <Carousel courses={topCourses} />
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col items-center justify-center">
          <div
            className="xl:h-[596px] lg:w-[100%] lg:h-[486px] w-[100%] h-[500px] transition-all duration-300 ease-in-out bg-gray-200
           rounded-xl mt-2 lg:mt-0 "
          >
            <VCarousel courses={topCourses} />
          </div>
        </div>
      </div>
      <div className="">
        <FeaturedCourses />
      </div>
    </div>
  );
}
