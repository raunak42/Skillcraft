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
import {
  COURSE_DELETE_SUCCESS_MESSAGE,
  REMOVED_FROM_WISHLIST_MESSAGE,
} from "@/lib/constants";

interface ModalProps {
  session: Session | null;
  user: User | null;
}
import { toast, Toaster } from "sonner";

export const Modal: React.FC<ModalProps> = ({ session, user }) => {
  const [displaModal, setDisplayModal] = useRecoilState(displayModalState);
  const [modalCourse, setModalCourse] = useRecoilState(courseState);
  const [response, setResponse] = useState<ApiResponseAttributes>();
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

  const RemoveItem = async () => {
    const res = await fetch(`/api/removeFromWishlist`, {
      method: "POST",
      body: JSON.stringify({
        courseIdToRemove: modalCourse?.id,
        data: { session, user },
      }),
    });

    const response: ApiResponseAttributes = await res.json();
    if (response.message === REMOVED_FROM_WISHLIST_MESSAGE) {
      if (courseCard) {
        courseCard.remove();
      }
      setIsLoading(false);
      setDisplayModal(false);
      setTimeout(() => {
        toast.success(REMOVED_FROM_WISHLIST_MESSAGE);
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
          className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-radial from-black/60 to-black/60"
        >
          <div className="rounded-2xl w-[90%] sm:w-[400px] h-[260px]rounded-xl bg-white flex flex-col items-center justify-between p-6 border-[1.5px] border-black">
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-semibold text-xl">Remove from wishlist:</h1>
              <h1>
                Are you sure you want to remove {modalCourse?.title} from
                wishlist?
              </h1>
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
                  RemoveItem();
                }}
                className="w-[128px] h-[40px] flex items-center justify-center rounded-full font-semibold px-4 py-1 bg-red-600  text-white"
              >
                {!isLoading && "Remove"}
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
