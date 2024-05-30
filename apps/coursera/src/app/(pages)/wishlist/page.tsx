import { validateRequest } from "@/auth";
import { BASE_URL_DEV } from "@/lib/constants";
import { ApiResponseAttributes } from "types";
import { ListItems } from "./ListItems";

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
  const wishlist = userData?.wishList;

  const wishListCourses = courses?.filter((course) =>
    wishlist?.includes(course.id!)
  );

  if (wishListCourses?.length === 0) {
    return <h1 className="mb-[400px] font-semibold text-2xl" >No courses to show.</h1>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-semibold">Your wishlist:</h1>
      <div className="flex flex-row flex-wrap  justify-start mb-[300px]">
        {wishListCourses?.map((course, index) => (
          <ListItems key={index} course={course} session={session} user={user} />
        ))}
      </div>
    </div>
  );
}
