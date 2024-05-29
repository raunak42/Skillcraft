"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  descriptionState,
  imageLinkState,
  priceState,
  titleState,
  adminDetailsState,
} from "state-store";
import { Session, User } from "lucia";
import { ApiResponseAttributes } from "types";
import { response } from "express";
import {
  COURSE_CREATE_SUCCESS_MESSAGE,
  COURSE_UPDATE_SUCCESS_MESSAGE,
} from "@/lib/constants";
import { courseInput } from "zod-validation";
import { isAbsoluteUrl } from "next/dist/shared/lib/utils";
import { ZodError } from "zod";
import { Toaster, toast } from "sonner";

interface CourseInputProps {
  session: Session | null;
  user: User | null;
  courseId: string | null;
  buttonText: string;
}

export const CourseInput: React.FC<CourseInputProps> = ({
  session,
  user,
  courseId,
  buttonText,
}) => {
  const [title, setTitle] = useRecoilState(titleState);
  const [description, setDescription] = useRecoilState(descriptionState);
  const [imageLink, setImageLink] = useRecoilState(imageLinkState);
  const [price, setPrice] = useRecoilState(priceState);
  const [clicked, setCLicked] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponseAttributes>();
  const [userDetails, setUserDetials] = useRecoilState(adminDetailsState);
  const courses = userDetails?.createdCourses;

  const thisCourse = courses?.find((course) => {
    return course.id.toString() === courseId;
  });

  useEffect(() => {
    setTitle(thisCourse?.title as string);
    setDescription(thisCourse?.description as string);
    setImageLink(thisCourse?.imageLink as string);
    setPrice(thisCourse?.price.toString()!);
  }, [thisCourse]);

  const sendData = async () => {
    try {
      const course = {
        title,
        description,
        imageLink,
        price: parseFloat(price),
        published: true,
      };
      const validatedCourse = courseInput.parse(course);
      if (!validatedCourse) {
        return console.log("error");
      }
      const res = await fetch(`/api/createCourse`, {
        method: "POST",
        body: JSON.stringify({
          title: validatedCourse.title,
          description: validatedCourse.description,
          imageLink: validatedCourse.imageLink,
          price: validatedCourse.price,
          published: true,
          data: { session, user },
        }),
      });
      const response: ApiResponseAttributes = await res.json();
      if (response.message === COURSE_CREATE_SUCCESS_MESSAGE) {
        setCLicked(false);
        toast.success(COURSE_CREATE_SUCCESS_MESSAGE);
      }
    } catch (error) {
      setCLicked(false);
      if (error instanceof ZodError) {
        alert(`${error.issues[0].message} at ${error.issues[0].path}`);
      }
    }
  };

  const updateData = async () => {
    try {
      const course = {
        title,
        description,
        imageLink,
        price: parseFloat(price),
        published: true,
      };
      const validatedCourse = courseInput.parse(course);
      if (!validatedCourse) {
        return console.log("error");
      }
      const res = await fetch(`/api/editCourse/${thisCourse?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: validatedCourse.title,
          description: validatedCourse.description,
          imageLink: validatedCourse.imageLink,
          price: validatedCourse.price,
          published: true,
          data: { session, user },
        }),
      });
      const response: ApiResponseAttributes = await res.json();
      if (response.message === COURSE_UPDATE_SUCCESS_MESSAGE) {
        setCLicked(false);
        toast.success(COURSE_UPDATE_SUCCESS_MESSAGE);

      }
    } catch (error) {
      setCLicked(false);
      if (error instanceof ZodError) {
        alert(`${error.issues[0].message} at ${error.issues[0].path}`);
      }
    }
  };

  let isInput: boolean = false;
  if (
    title &&
    description &&
    isAbsoluteUrl(imageLink) &&
    !isNaN(parseFloat(price!))
  ) {
    isInput = true;
  }

  return (
    <div className="space-y-6 w-[260px] sm:w-[400px]">
      <Toaster />
      <div className="flex flex-col">
        <h1>Title</h1>
        <input
          className="border-[1.5px] rounded-md px-2 py-1 border-black h-[40px] sm:h-[50px] "
          onChange={(event) => {
            console.log(event.currentTarget.value);
            setTitle(event.currentTarget.value);
          }}
          defaultValue={thisCourse?.title}
        ></input>
      </div>
      <div className="flex flex-col">
        <h1>Description</h1>
        <input
          className="border-[1.5px] rounded-md px-2 py-1 border-black h-[40px] sm:h-[50px] "
          onChange={(event) => {
            setDescription(event.currentTarget.value);
          }}
          defaultValue={thisCourse?.description as string}
        ></input>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <h1>Image link</h1>
          {imageLink && !isAbsoluteUrl(imageLink) && (
            <div className="flex flex-row items-center">
              <img src="/warning.svg" className="size-4"></img>
              <h1 className="text-xs  text-red-500">Input a valid url</h1>
            </div>
          )}
        </div>
        <input
          className="border-[1.5px] rounded-md px-2 py-1 border-black h-[40px] sm:h-[50px] "
          onChange={(event) => {
            setImageLink(event.currentTarget.value);
          }}
          defaultValue={thisCourse?.imageLink as string}
        ></input>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <h1>Price</h1>
          {price && isNaN(parseFloat(price)) && (
            <div className="flex flex-row items-center">
              <img src="/warning.svg" className="size-4"></img>
              <h1 className="text-xs  text-red-500">
                Price should be a number.
              </h1>
            </div>
          )}
        </div>
        <input
          className="border-[1.5px] rounded-md px-2 py-1 border-black h-[40px] sm:h-[50px] "
          onChange={(event) => {
            setPrice(event.currentTarget.value);
          }}
          defaultValue={thisCourse?.price}
        ></input>
      </div>
      <div
        className={`${isInput && "bg-black hover:cursor-pointer"} ${!isInput && "bg-black/40"} w-full h-[40px]  lg:h-[50px] rounded-full flex flex-row items-center justify-center`}
        onClick={() => {
          console.log(isInput);

          if (isInput) {
            setCLicked(true);
            {
              buttonText === "Publish" && sendData();
            }
            {
              buttonText === "Update" && updateData();
            }
          }
        }}
      >
        {!clicked && <h1 className="text-white font-semibold">{buttonText}</h1>}
        {clicked && (
          <img src="/spinner.svg" className="animate-spin size-5"></img>
        )}
      </div>
      <a
        href="/myCourses"
        className={`${"font-semibold bg-white border-[1.5px] border-black hover:cursor-pointer"}  w-full h-[40px]  lg:h-[50px] rounded-full flex flex-row items-center justify-center`}
      >
        Cancel
      </a>
    </div>
  );
};
