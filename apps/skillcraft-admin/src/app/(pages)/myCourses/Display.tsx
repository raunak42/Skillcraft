"use client";
import { adminDetailsState } from "state-store";
import { useRecoilState } from "recoil";
import { Item } from "./Items";
import { Session, User } from "lucia";

interface DisplayProps {
  session: Session | null;
  user: User | null;
}

export const Display: React.FC<DisplayProps> = ({ session, user }) => {
  const [userDetails, setUserDetials] = useRecoilState(adminDetailsState);

  const courses = userDetails?.createdCourses;

  if (!courses) {
    return (
      <div className="p-4 mb-[400px] flex flex-row justify-center ">
        <img src="/spinnerBlack.svg" className="size-14 animate-spin"></img>
      </div>
    );
  }
  if (courses.length === 0) {
    return (
      <h1 className="text-2xl font-semibold p-4 mb-[400px]">
        You have not created any courses.
      </h1>
    );
  }

  return (
    <div className="relative flex flex-col">
      <h1 className="text-3xl font-semibold pl-8 pb-2">
        Your created courses:
      </h1>
      <div className=" sm:pl-12 xl:pl-8 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start ">
        {courses.map((course) => {
          return (
            <Item
              key={course.id}
              session={session}
              user={user}
              course={course}
            />
          );
        })}
      </div>
    </div>
  );
};
