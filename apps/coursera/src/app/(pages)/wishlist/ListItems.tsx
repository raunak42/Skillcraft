"use client";
import { CourseCard } from "@/components/Coursecard/CourseCard";
import { Session, User } from "lucia";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { courseState, displayModalState } from "state-store";
import { ApiResponseAttributes, PrismaCourseOutput } from "types";

interface ListItemsProps {
  course: PrismaCourseOutput<{ select: {}; include: { admin: true } }>;
  session: Session | null;
  user: User | null;
}

export const ListItems: React.FC<ListItemsProps> = ({
  course,
  session,
  user,
}) => {
  const [removeClicked, setRemoveClicked] = useState<boolean>(false);
  const [displaModal, setDisplayModal] = useRecoilState(displayModalState);
  const [modalCourse, setModalCourse] = useRecoilState(courseState);


  return (
    !removeClicked && (
      <div id={course.id?.toString()} className="ml-4 mt-6">
        <CourseCard
          imageLink={course.imageLink as string}
          title={course.title}
          description={course.description as string}
          adminUsername={course.admin?.username as string}
          key={course.id}
          price={course.price}
          courseId={course.id as number}
        />
        <div className="mt-2 flex flex-row justify-end rounded-full overflow-hidden">
          <img
            onClick={() => {
              setDisplayModal(true);
              setModalCourse(course);
            }}
            className="size-4 hover:cursor-pointer rounded-full hover:bg-white"
            src="/minus.svg"
          ></img>
        </div>
      </div>
    )
  );
};
