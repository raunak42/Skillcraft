// "use client";
import { PaymentComponent } from "../PaymentComponent/PaymentComponent";
import { Suspense } from "react";
import { validateRequest } from "@/auth";
import { SessionButtons } from "./Buttons/SessionButtons";
import { Buttons } from "./Buttons/Buttons";
import { PrismaCourseOutput } from "types";
import Accordion from "../Accordion/Accordion";
import { blurUrlCreator } from "@/helpers/blurUrlCreator";
import Image from "next/image";
import { ImageComponent } from "./ImageComponent/ImageComponent";

interface CourseInfoProps {
  course: PrismaCourseOutput<{ select: {}; include: { admin: true } }>;
}
export const CourseInfo: React.FC<CourseInfoProps> = async ({ course }) => {
  const { session, user } = await validateRequest();
  const base64 = await blurUrlCreator(course.imageLink!);

  return (
    <div
      className={`bg-white ${!session && "py-2"} grid grid-cols-7  mx-[15px] rounded-2xl gap-4 xl:mx-[50px] overflow-hidden `}
    >
      <div
        className={` md:border-r border-gray-200 py-2 px-4 col-span-7 ${session && "md:col-span-4"} ${session && "lg:col-span-4"} ${!session && "lg:col-span-7"} md:py-4 px-2 flex flex-col  gap-10`}
      >
        <div
          className={`  ${!session && "grid grid-cols-5"} ${session && "flex flex-col gap-4 items-start justify-start"} `}
        >
          <div className={`  flex flex-col  col-span-5 md:col-span-3 w-full`}>
            <div className=" flex flex-col w-[90%] items-start justify-start">
              <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold md:pt-0 ">
                {course.title}
              </h1>
              <h1 className=" text-md lg:text-xl xl:text-lg ">
                {course.description}
              </h1>
              <h1 className="text-xs lg:text-sm flex flex-row gap-1 pt-4">
                Created by
                <p className="font-semibold"> {course.admin?.username}</p>
              </h1>
            </div>
            <div className=" w-full md:w-[90%] lg:w-[80%] flex flex-col ">
              <div
                className={`relative flex flex-row items-start justify-start shrink-0 w-full `}
              >
                <div className="w-full ">
                  <div className="rounded-xl w-full  absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>

                  {/* <img
                    className="rounded-xl shrink-0 w-full"
                    src={course.imageLink as string}
                    alt={course.title as string}
                  /> */}
                  <ImageComponent base64={base64} course={course} />
                  <h1 className="absolute left-[0%] bottom-1 lg:left-2 lg:bottom-2 text-white flex flex-row justify-start ml-4 md:ml-0 mt-4 w-full text-2xl md:text-2xl font-bold">
                    ₹{course.price}/-
                  </h1>
                </div>
              </div>
              {session && (
                <SessionButtons
                  session={session}
                  user={user}
                  courseId={course.id!}
                />
              )}
              {!session && <Buttons />}
            </div>
          </div>

          <div
            className={` mt-6 md:mt-0 ${session && "md:mt-6"} w-full  pb-4 md:pb-0 col-span-5 md:col-span-2 ${!session && "flex flex-col items-start justify-start"}`}
          >
            <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl">
              What you'll learn :-
            </h1>
            <div className="w-full mt-4">
              {course.chapters &&
                course.chapters.length > 0 &&
                course.chapters.map((chapter, index) => (
                  <div className="" key={index}>
                    <Accordion
                      title={`Chapter ${index + 1}: ${chapter}`}
                      content={
                        <div className="shadow-xl  flex flex-col items-center justify-center p-6 bg-zinc-300 rounded-full">
                          <img src="/lock.svg" className="size-8"></img>
                        </div>
                      }
                    />
                  </div>
                ))}
              {!course.chapters ||
                (course.chapters.length === 0 &&
                  Array.from({ length: 10 }, (_, index) => (
                    <div className="" key={index}>
                      <Accordion
                        title={`Chapter ${index + 1}:-`}
                        content={
                          <div className="shadow-xl  flex flex-col items-center justify-center p-6 bg-zinc-300 rounded-full">
                            <img src="/lock.svg" className="size-8"></img>
                          </div>
                        }
                      />
                    </div>
                  )))}
            </div>
            {!session && (
              <a
                href="/login/fresh"
                className="hover:cursor-pointer w-[240px] lg:w-[300px] h-[46px] flex items-center justify-center text-white font-semibold  rounded-full bg-green-500 mt-[30px]"
              >
                Login to purchase
              </a>
            )}
          </div>
        </div>
      </div>

      {session && (
        <Suspense
          fallback={
            <div className="col-span-7 md:px-4  md:col-span-3 xl:col-span-3 md:py-4  flex flex-col gap-4 items-center mt-[280px]">
              <div className="size-[80px]">
                <img src="/spinnerBlack.svg" className="animate-spin"></img>
              </div>
            </div>
          }
        >
          <div className=" col-span-7 md:px-4  md:col-span-3 xl:col-span-3 px-2 sm:px-0 py-4  flex flex-col gap-4 items-center">
            <div className="w-full">
              <PaymentComponent
                title={course.title!}
                price={course.price!}
                imageLink={course.imageLink!}
                id={course.id!}
              />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};
