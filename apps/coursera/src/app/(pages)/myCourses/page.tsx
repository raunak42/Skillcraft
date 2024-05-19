import { validateRequest } from "@/auth";
import { MyCourseCard } from "@/components/MyCourseCard/MyCourseCard";
import { BASE_URL_DEV } from "@/lib/constants";
import { response } from "express";
import { ApiResponseAttributes } from "types";

export default async function Page() {
  const { session, user } = await validateRequest();
  const res = await fetch(`${BASE_URL_DEV}/api/myCourses`, {
    method: "POST",
    body: JSON.stringify({
      data: { session, user },
    }),
    cache: "no-store",
    headers: {
      Origin: BASE_URL_DEV, ///Middleware demands the origin header. Need to send this origin header because this POST request is being made from a server component. Server deons't know the origin of the client.
    },
  });

  const response: ApiResponseAttributes = await res.json();
  const courses = response.data?.courses;

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-semibold">Your courses:</h1>
      <div className="flex flex-row flex-wrap  justify-start">
        {courses?.map((course, index) => (
          <div className="mt-6 ml-4" key={index}>
            {
              <MyCourseCard
                imageLink={course.imageLink as string}
                title={course.title}
                description={course.description as string}
                adminUsername={course.admin?.username as string}
                key={index}
                courseId={course.id as number}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
}
