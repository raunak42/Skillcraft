import { BASE_URL_DEV } from "@/lib/constants";
import { CourseCardHz } from "../CourseCardHz/CourseCardHz";
import { ApiResponseAttributes } from "types";

interface VCarouselProps {}

export const VCarousel: React.FC<VCarouselProps> = async () => {
  const res = await fetch(`${BASE_URL_DEV}/api/getTopCourses`, {
    cache: "no-store",
  });
  const response: ApiResponseAttributes = await res.json();

  const topCourses = response.data?.courses;
  if (!topCourses) {
    return;
  }

  return (
    <div className="ml-4 w-[420px] h-[574px] border-t-2 border-b-2 space-y-2 overflow-y-auto overflow-hidden p-2">
    {topCourses.map((course) => {
        return (
            <CourseCardHz
              key={course.id}
              title={course.title as string}
              imageLink={course.imageLink as string}
            />
        );
      })}
    </div>
  );
};
