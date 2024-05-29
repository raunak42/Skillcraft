"use client";
import { CourseCardHz } from "@/components/CourseCardHz/CourseCardHz";
import { Session, User } from "lucia";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { removeClickedState } from "state-store";
import { ApiResponseAttributes, PrismaCourseOutput } from "types";
import { Toaster, toast } from "sonner";
// import { RemoveButton } from "./RemoveButton";

interface CartItemsProps {
  course: PrismaCourseOutput<{ select: {}; include: {} }>;
  session: Session | null;
  user: User | null;
}

export const CartItems: React.FC<CartItemsProps> = ({
  course,
  session,
  user,
}) => {
  const [response, setResponse] = useState<ApiResponseAttributes>();
  const [removeClicked, setRemoveClicked] = useRecoilState(removeClickedState);
  const [courseToRemove, setCourseToRemove] = useState<number>();

  const RemoveItem = async (courseId: number) => {
    toast.success("Removed from cart.")
    const res = await fetch(`/api/removeFromCart`, {
      method: "POST",
      body: JSON.stringify({
        courseIdToRemove: courseId,
        data: { session, user },
      }),
    });

    const response = await res.json();
    setResponse(response);
    window.location.reload();
  };

  return (
    <div
      className={`${"bg-gray-200 p-4 rounded-xl"} ${removeClicked && "animated-gradient-dark"}`}
    >
      {!removeClicked && (
        <CourseCardHz
          title={course.title as string}
          description={course.description as string}
          imageLink={course.imageLink as string}
          price={course.price as number}
          id={course.id as number}
        />
      )}
      {!removeClicked && (
        <div className=" flex flex-row justify-end rounded-full overflow-hidden">
          <img
            onClick={() => {
              setRemoveClicked(true);
              RemoveItem(course.id!);
            }}
            className="size-4 hover:cursor-pointer rounded-full hover:bg-white"
            src="/minus.svg"
          ></img>
        </div>
      )}
      {removeClicked && (
        <div className="">
          <CourseCardHz
            title={course.title as string}
            description={course.description as string}
            imageLink={course.imageLink as string}
            price={course.price as number}
            id={course.id as number}
          />
        </div>
      )}
      {removeClicked && (
        <div className=" flex flex-row justify-end rounded-full overflow-hidden">
          <Toaster/>
          <img
            onClick={() => {
              setRemoveClicked(true);
              RemoveItem(course.id!);
            }}
            className="size-4 hover:cursor-pointer rounded-full hover:bg-gray-200"
            src="/minus.svg"
          ></img>
        </div>
      )}
    </div>
  );
};
