import { BASE_URL_DEV } from "@/lib/constants";
import Image from "next/image";
import { ApiResponseAttributes, PrismaCourseOutput, courseId } from "types";

interface CourseParams {
  params: {
    courseId: string;
  };
}

export default async function Page({ params }: CourseParams) {
  console.log(params.courseId);
  const res = await fetch(`${BASE_URL_DEV}/api/getCourses`, {
    method: "GET",
    cache: "no-store",
  });
  const response: ApiResponseAttributes = await res.json();
  if (!response.data) {
    return;
  }
  if (!response.data.courses) {
    return;
  }
  const courses: PrismaCourseOutput<{
    select: {};
    include: { admin: true };
  }>[] = response.data.courses;
  if (!courses) {
    return;
  }

  const thisCourse = courses.find((course) => {
    return (course.id as number).toString() === params.courseId;
  });
  return (
    <div className="grid grid-cols-4 h-full bg-[#ffffff] mx-[15px] rounded-2xl lg:gap-4 xl:mx-[50px] overflow-hidden">
      <div className="col-span-4 md:px-4  md:col-span-2 md:py-4  flex flex-col items-center justify-between">
        <div>
          <img
            className="shadow-lg md:shadow-none md:rounded-xl"
            src={thisCourse?.imageLink as string}
            alt={thisCourse?.title as string}
          ></img>
          <h1 className="flex flex-row justify-start ml-4 md:ml-0 mt-4 w-full text-2xl md:text-3xl font-bold">
            ₹{thisCourse?.price}/-
          </h1>
        </div>

        <div className="w-full flex flex-col items-center">
          <button className="w-[85%] md:w-full bg-black mt-4 p-2 lg:mt-6  text-md lg:text-xl font-semibold rounded-full text-white">
            Buy Course
          </button>
          <button className="w-[85%] md:w-full bg-black mt-4 p-2 lg:mt-6  text-md lg:text-xl font-semibold rounded-full text-white ">
            Simulate a purchase
          </button>
        </div>
      </div>
      <div className="col-span-4 md:col-span-2 md:py-4 px-2 flex flex-col justify-between gap-10">
        <div className="">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold pt-[52px] md:pt-0">
            {thisCourse?.title}
          </h1>
          <h1 className="text-md lg:text-xl xl:text-2xl lg:pl-[6px]">
            {thisCourse?.description}
          </h1>
          <h1 className="text-xs lg:text-sm  lg:pl-[6px] flex flex-row gap-1 pt-4">
            Created by
            <p className="font-semibold"> {thisCourse?.admin?.username}</p>
          </h1>
        </div>

        <div className="pb-4 md:pb-0">
          <h1 className=" lg:text-2xl xl:text-3xl font-semibold">
            What you'll learn :-
          </h1>

          <div className="space-y-1 pl-[6px]">
            <div className="overflow-y-auto mt-2">
              {thisCourse?.chapters?.map((chapter, index) => (
                <h1
                  key={index}
                  className="lg:text-lg xl:text-xl text-sm lg:pl-[18px] pl-[10px]"
                >
                  • Chapter {index + 1}: {chapter}

                  <br />
                  {/* • Chapter {index + 1}: {chapter} */}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
