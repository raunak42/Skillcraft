// "use client";
import { PaymentComponent } from "../PaymentComponent/PaymentComponent";
import { Suspense } from "react";
import { validateRequest } from "@/auth";
import { Login } from "../Login/Login";
import { Buttons } from "./Buttons";
import { handleLogin } from "@/app/(pages)/login/page";

interface CourseInfoProps {
  imageLink: string;
  title: string;
  price: number;
  description: string;
  chapters: [];
  adminUsername: string;
  // session: Session | null;
  courseId: number;
}
export const CourseInfo: React.FC<CourseInfoProps> = async ({
  imageLink,
  title,
  price,
  description,
  chapters,
  adminUsername,
  // session,
  courseId,
}) => {
  const { session, user } = await validateRequest();

  return (
    <div className=" grid grid-cols-7 h-full bg-[#ffffff] mx-[15px] rounded-2xl lg:gap-4 xl:gap-0 xl:mx-[50px] overflow-hidden ">
      <div
        className={`py-2 px-4 col-span-7 ${session && "md:col-span-4"} lg:col-span-4 md:py-4 px-2 flex flex-col  gap-10`}
      >
        <div className=" flex flex-col items-start justify-start">
          <div className=" flex flex-col  items-start justify-start">
            <h1 className="text-3xl lg:text-4xl xl:text-4xl font-bold md:pt-0">
              {title}
            </h1>
            <h1 className=" text-md lg:text-xl xl:text-lg ">{description}</h1>
            <h1 className="text-xs lg:text-sm flex flex-row gap-1 pt-4">
              Created by
              <p className="font-semibold"> {adminUsername}</p>
            </h1>
          </div>

          <div className="w-full">
            <div className="relative flex flex-row items-center justify-center shrink-0 w-full">
              <div className="rounded-xl absolute inset-0 bg-gradient-radial from-transparent to-black/40"></div>
              <img
                className="rounded-xl shrink-0 size-full"
                src={imageLink as string}
                alt={title as string}
              ></img>
              <h1 className="absolute left-2 bottom-2 text-white flex flex-row justify-start ml-4 md:ml-0 mt-4 w-full text-2xl md:text-2xl font-bold">
                ₹{price}/-
              </h1>
            </div>

            {/* <div className="px-2 md:px-0 w-full flex flex-row items-center justify-between gap-2">
              <button
                // onClick={handleBuy}
                className="   bg-black mt-4 px-6 py-2 lg:mt-6  text-sm lg:text-md font-semibold  text-white"
              >
                Add to wishlist
              </button>
              <button
                onClick={addToCart}
                className="   bg-black mt-4 px-6 py-2 lg:mt-6  text-sm lg:text-md font-semibold  text-white"
              >
                + Add to cart
              </button>
            </div> */}
            <Buttons session={session} user={user} courseId={courseId} />
          </div>

          <div className="pb-4 md:pb-0 pt-10">
            <h1 className=" lg:text-2xl xl:text-2xl font-semibold">
              What you'll learn :-
            </h1>

            <div className="space-y-1 pl-[6px]">
              <div className="overflow-y-auto mt-2">
                {chapters?.map((chapter, index) => (
                  <h1
                    key={index}
                    className="lg:text-lg xl:text-base text-sm lg:pl-[18px] pl-[10px]"
                  >
                    • Chapter {index + 1}: {chapter}
                    <br />
                    {/* • Chapter {index + 1}: {chapter} */}
                  </h1>
                ))}
              </div>
            </div>
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
                title={title}
                price={price}
                imageLink={imageLink}
                id={courseId}
              />
            </div>
          </div>
        </Suspense>
      )}
      {!session && (
        <div className=" bg-gray-300/90 shadow-inner  col-span-7 md:px-4  xl:col-span-3 md:py-4  flex flex-col items-center justify-center xl:justify-start gap-8 py-4 ">
          <div className=" flex flex-row items-center justify-center gap-4">
            <img className="size-8 lg:size-10" src="/login.svg"></img>
            <h1 className="text-xl lg:text-2xl font-semibold">
              Login to buy this course
            </h1>
          </div>
          <div className="gap-8 px-4 w-full md:w-[30%] flex flex-col items-center justify-center">
            <form
              action={handleLogin}
              className="flex flex-col items-center justify-center"
            >
              <Login buttonText="Login" />
            </form>
            <div className="flex flex-row">
              Or{""}
              <a href="/signup" className="pl-1 font-semibold hover:cursor-pointer"> Signup</a>?
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
