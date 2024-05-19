import { validateRequest } from "@/auth";
import { CartPayment } from "@/components/CartPayment/CartPayment";
import { CourseCardHz } from "@/components/CourseCardHz/CourseCardHz";
import { BASE_URL_DEV } from "@/lib/constants";
import { ApiResponseAttributes } from "types";
import { CartItems } from "./CartItems";
import { Suspense } from "react";

export default async function Page() {
  const { session, user } = await validateRequest();

  const res = await fetch(`${BASE_URL_DEV}/api/getCourses`, {
    method: "GET",
    cache: "no-store",
  });

  const response: ApiResponseAttributes = await res.json();
  const courses = response.data?.courses;

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
  const cart = userData?.cart;

  const cartCourses = courses?.filter((course) => cart?.includes(course.id!));
  console.log(cartCourses);

  if(cartCourses?.length===0){
    return<h1>No courses to show.</h1>
  }

  return (
    <div className="grid grid-cols-4 bg-white rounded-2xl p-4">
      <div className="col-span-4 lg:col-span-2 space-y-4">
        {cartCourses?.map((course, index) => {
          return (
            <div key={index}>
              <CartItems course={course} session={session} user={user} />
            </div>
          );
        })}
      </div>
      <div className="col-span-4 lg:col-span-2 mt-4 md:mt-0">
        <Suspense
          fallback={
            <div className="col-span-2 md:px-4  md:col-span-3 xl:col-span-3 md:py-4  flex flex-col gap-4 items-center mt-[280px]">
              <div className="size-[80px]">
                <img src="/spinnerBlack.svg" className="animate-spin"></img>
              </div>
            </div>
          }
        >
          <CartPayment courses={cartCourses!} />
        </Suspense>
      </div>
    </div>
  );
}
