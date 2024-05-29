"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  courseState,
  displayModalState,
  deleteConfirmationState,
  titleState,
} from "state-store";
import { Session, User } from "lucia";
import { ApiResponseAttributes } from "types";
import { COURSE_DELETE_SUCCESS_MESSAGE } from "@/lib/constants";

interface ModalProps {
  session: Session | null;
  user: User | null;
}
import { toast, Toaster } from "sonner";

export const Modal: React.FC<ModalProps> = ({ session, user }) => {
  const [displaModal, setDisplayModal] = useRecoilState(displayModalState);
  const [modalCourse, setModalCourse] = useRecoilState(courseState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let courseCard: HTMLElement | null;
  useEffect(() => {
    courseCard = document.getElementById(modalCourse?.id?.toString()!);

    if (displaModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [displaModal]);

  const deleteCourse = async () => {
    const course = modalCourse!;
    const res = await fetch(`/api/deleteCourse/${course.id}`, {
      method: "DELETE",
      body: JSON.stringify({
        title: course.title,
        description: course.description,
        imageLink: course.imageLink,
        price: course.price,
        published: true,
        data: { session, user },
      }),
    });
    const response: ApiResponseAttributes = await res.json();
    if (response.message === COURSE_DELETE_SUCCESS_MESSAGE) {
      if (courseCard) {
        courseCard.remove();
      }
      setIsLoading(false);
      setDisplayModal(false);
      setTimeout(() => {
        toast.success(COURSE_DELETE_SUCCESS_MESSAGE);
      }, 10);
    }
  };

  return (
    <div>
      {!displaModal && <Toaster />}
      {displaModal && (
        <div
          onClick={(event) => {
            //so that modal closes only when the external div(the black transparent area) is clicked.
            if (event.target === event.currentTarget && !isLoading) {
              setDisplayModal(false);
            }
          }}
          className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-radial from-transparent to-black/60"
        >
          <div className="w-[400px] h-[260px] rounded-xl bg-white flex flex-col items-center justify-between p-6 border-[1.5px] border-black">
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-semibold text-xl">Delete course:</h1>
              <h1>Are you sure you want to delete {modalCourse?.title}?</h1>
            </div>

            <div className="w-full flex flex-row items-center justify-evenly">
              <Toaster />
              <button
                onClick={() => {
                  !isLoading && setDisplayModal(false);
                }}
                className="w-[128px] h-[40px] rounded-full font-semibold px-4 py-1 border border-black"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsLoading(true);
                  deleteCourse();
                }}
                className="w-[128px] h-[40px] flex items-center justify-center rounded-full font-semibold px-4 py-1 bg-red-600  text-white"
              >
                {!isLoading && "Delete"}
                {isLoading && (
                  <img className="size-5 animate-spin" src="/spinner.svg"></img>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
