import { validateRequest } from "@/auth";
import { CourseCard } from "@/components/Coursecard/CourseCard";
import { CourseInput } from "./CourseInput";

export default async function Page() {
  const { session, user } = await validateRequest();

  return (
    <div className="mx-8 mt-12 grid grid-cols-4 bg-white px-4 lg:py-4  py-2 lg:mx-14  rounded-2xl">
      <div className="col-span-4 lg:col-span-2 flex flex-col items-center justify-start gap-4 lg:gap-10 ">
        <div className="w-full">
          <h1 className="lg:text-3xl text-xl font-semibold">
            Create a new course:
          </h1>
        </div>
        <div>
          <CourseCard adminUsername={user?.username!} />
        </div>
      </div>
      <div className="mt-10 lg:mt-0 col-span-4 lg:col-span-2 flex flex-col items-center justify-evenly py-[40px] border-t-[1.5px] lg:border-t-0 lg:border-l-[1.5px] border-gray-200 ">
        <CourseInput
          courseId={null}
          buttonText={"Publish"}
          session={session}
          user={user}
        />
      </div>
    </div>
  );
}
