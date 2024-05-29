"use client";
import { MyCourseCard } from "@/components/Coursecard/MyCourseCard";
import { useEffect, useRef, useState } from "react";
import { PrismaCourseOutput } from "types";
import { Session, User } from "lucia";
import {
  courseIdState,
  courseState,
  displayModalState,
  deleteConfirmationState,
  titleState,
} from "state-store";
import { useRecoilState } from "recoil";

interface ItemsProps {
  course: PrismaCourseOutput<{ select: {}; include: { admin: true } }>;
  session: Session | null;
  user: User | null;
}

export const Item: React.FC<ItemsProps> = ({ course, session, user }) => {
  const [displaModal, setDisplayModal] = useRecoilState(displayModalState);
  const [modalCourse, setModalCourse] = useRecoilState(courseState);
  const myElementRef = useRef(course.id); // Create a ref


  return (
     (
      <div id={course.id?.toString()} key={course.id} className="p-2 gap-2 flex flex-col ">
        <MyCourseCard
          courseId={course.id!}
          title={course.title}
          description={course.description as string}
          adminUsername={course.admin?.username!}
          imageLink={course.imageLink!}
          price={course.price}
          key={course.id}
        />
        <div className="flex flex-row items-center justify-end">
          <img
            onClick={async () => {
              setDisplayModal(true);
              setModalCourse(course);
            }}
            src="/minus.svg"
            className="size-5 hover:cursor-pointer hover:bg-white rounded-full "
          ></img>
        </div>
      </div>
    )
  );
};
