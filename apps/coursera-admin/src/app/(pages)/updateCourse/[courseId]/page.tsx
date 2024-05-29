import { validateRequest } from "@/auth";
import { CourseInput } from "../../create/CourseInput";
import { ThisCourse } from "./ThisCourse";

interface CourseParams {
  params: {
    courseId: string;
  };
}

export default async function Page({ params }: CourseParams) {
  const { session, user } = await validateRequest();

  return (
    <div className=" mt-12 grid grid-cols-4 bg-white lg:px-4 lg:py-4 px-2 py-2 lg:mx-14 mx-2 rounded-2xl">
      <div className="col-span-4 lg:col-span-2 flex flex-col items-center justify-start gap-4 lg:gap-10 ">
        <div className="w-full">
          <h1 className="lg:text-3xl text-xl font-semibold">
            Update your course:
          </h1>
        </div>
        <div>
          <ThisCourse courseId={params.courseId} />
        </div>
      </div>
      <div className="mt-10 lg:mt-0 col-span-4 lg:col-span-2 flex flex-col items-center justify-evenly py-[40px] border-t-[1.5px] lg:border-t-0 lg:border-l-[1.5px] border-gray-200 ">
        <CourseInput
          buttonText={"Update"}
          courseId={params.courseId}
          session={session}
          user={user}
        />
        {/* <button className="mt-4 w-[120px] h-[40px] bg-red-600 text-white font-semibold rounded-full flex items-center justify-center">
           Delete
        </button> */}
      </div>
    </div>
  );
}
