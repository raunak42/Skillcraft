import { validateRequest } from "@/auth";
import { CourseInfo } from "@/components/CourseInfo/CourseInfo";
import { BASE_URL_DEV } from "@/lib/constants";
import { ApiResponseAttributes, PrismaCourseOutput } from "types";

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

  console.log(alreadyPurchasedCourse);

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
      {
        alreadyPurchasedCourse&&(
          <div>Show video</div>
        )
      }
    </div>
  );
}
