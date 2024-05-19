import { validateRequest } from "@/auth";
import { CourseInfo } from "@/components/CourseInfo/CourseInfo";
import { BASE_URL_DEV } from "@/lib/constants";
import { ApiResponseAttributes, PrismaCourseOutput } from "types";
import Video from "next-video";
import Accordion from "@/components/Accordion/Accordion";

interface CourseParams {
  params: {
    courseId: string;
  };
}

export default async function Page({ params }: CourseParams) {
  const { session, user } = await validateRequest();

  const coursesRes = await fetch(`${BASE_URL_DEV}/api/getCourses`, {
    method: "GET",
    cache: "no-store",
  });
  const coursesResponse: ApiResponseAttributes = await coursesRes.json();
  if (!coursesResponse.data) {
    return;
  }
  if (!coursesResponse.data.courses) {
    return;
  }
  const courses: PrismaCourseOutput<{
    select: {};
    include: { admin: true };
  }>[] = coursesResponse.data.courses;
  if (!courses) {
    return;
  }

  const thisCourse = courses.find((course) => {
    return (course.id as number).toString() === params.courseId;
  });

  const userRes = await fetch(`${BASE_URL_DEV}/api/me`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({
      data: { session, user },
    }),
    headers: {
      Origin: BASE_URL_DEV, ///Middleware demands the origin header. Need to send this origin header because this POST request is being made from a server component. Server deons't know the origin of the client.
    },
  });

  const userResponse: ApiResponseAttributes = await userRes.json();
  const userData = userResponse.data?.user;
  const userCourses = userData?.courses;

  const alreadyPurchasedCourse = userCourses?.find(
    (course) => course.id === thisCourse?.id
  );

  return (
    <div>
      {!alreadyPurchasedCourse && (
        <CourseInfo
          key={thisCourse?.id}
          title={thisCourse?.title as string}
          price={thisCourse?.price as number}
          imageLink={thisCourse?.imageLink as string}
          description={thisCourse?.description as string}
          chapters={thisCourse?.chapters as []}
          adminUsername={thisCourse?.admin?.username as string}
          // session={session}
          courseId={thisCourse?.id as number}
        />
      )}
      {alreadyPurchasedCourse && (
        <div className="gap-[60px] flex flex-col">
          <div className="w-full bg-gray-300 p-4 rounded-lg flex flex-col md:flex-row gap-4">
            <img
              className="w-full md:w-[30%] rounded-2xl"
              src={thisCourse?.imageLink as string}
            ></img>
            <div>
              <h1 className="text-3xl font-semibold">{thisCourse?.title}</h1>
              <div className="flex flex-row gap-1">
                By<h2 className="font-semibold">{thisCourse?.admin?.username}</h2>
              </div>
              <h1 className="mt-4 text-lg">{thisCourse?.description}</h1>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Contents</h1>
            {thisCourse?.chapters?.map((chapter, index) => (
              <Accordion
                key={index}
                title={`Chapter ${index + 1}: ${chapter}`}
                content={
                  <div className="w-[400px]">
                    <Video
                      src={(thisCourse.chapterVideoLinks as [])[index]}
                    />
                  </div>
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
