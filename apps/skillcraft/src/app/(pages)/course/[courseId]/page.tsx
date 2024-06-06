import { validateRequest } from "@/auth";
import { CourseInfo } from "@/components/CourseInfo/CourseInfo";
import { BASE_URL_DEV } from "@/lib/constants";
import { ApiResponseAttributes, PrismaCourseOutput } from "types";
import Accordion from "@/components/Accordion/Accordion";
import Loading from "./loading";

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


  if (!coursesResponse?.data?.courses) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const courses: PrismaCourseOutput<{
    select: {};
    include: { admin: true };
  }>[] = coursesResponse.data.courses;

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
      {!alreadyPurchasedCourse && <CourseInfo course={thisCourse!} />}
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
                By
                <h2 className="font-semibold">{thisCourse?.admin?.username}</h2>
              </div>
              <h1 className="mt-4 text-lg">{thisCourse?.description}</h1>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Contents</h1>
            {thisCourse?.chapters &&
              thisCourse.chapters.length > 0 &&
              thisCourse.chapters.map((chapter, index) => (
                <Accordion
                  key={index}
                  title={`Chapter ${index + 1}: ${chapter}`}
                  content={
                    <div className="px-4 sm:w-[400px]  overflow-hidden">
                      <video
                        className="hover:cursor-pointer rounded-2xl"
                        // accentColor="#000000"
                        controls
                        src={(thisCourse.chapterVideoLinks as [])[index]}
                      />
                    </div>
                  }
                />
              ))}
            {!thisCourse?.chapters ||
              (thisCourse.chapters.length === 0 &&
                Array.from({ length: 10 }, (_, index) => (
                  <Accordion
                    key={index}
                    title={`Chapter ${index + 1}:-`}
                    content={
                      <div className="shadow-xl  flex flex-col items-center justify-center p-6 bg-zinc-300 rounded-full">
                        {/* <img src="/lock.svg" className="size-8"></img> */}
                        <h1>No videos for this course.</h1>
                      </div>
                    }
                  />
                )))}
          </div>
        </div>
      )}
    </div>
  );
}
