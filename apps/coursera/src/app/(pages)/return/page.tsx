"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BASE_URL_DEV } from "@/lib/constants";
import { ApiResponseAttributes, PrismaCourseOutput } from "types";
import Loading from "./loading";

interface ResponesType {
  status: string;
  customer_email: string;
}

export default function Page() {
  const [response, setResponse] = useState<ResponesType>();
  const [courses, setCourses] = useState<
    PrismaCourseOutput<{ select: {}; include: {} }>[] | undefined
  >([]);

  const router = useRouter();

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const courseId = searchParams.get("courseId");
  const userId = searchParams.get("userId");

  const fetchData = async () => {
    if (sessionId) {
      const res = await fetch(`/api/checkoutSession?session_id=${sessionId}`, {
        method: "GET",
      });

      const response = await res.json();
      setResponse(response);
    }
  };

  const fetchData2 = async () => {
    const res = await fetch(`/api/getCourses`, {
      method: "GET",
      cache: "no-store",
    });
    const response: ApiResponseAttributes = await res.json();
    const courses = response.data?.courses;
    setCourses(courses);
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  if (!response || !courses || courses.length===0) {
    return <Loading></Loading>;
  }

  const thisCourse = courses.find(
    (course) => course.id?.toString() === courseId
  );

  const status = response.status;
  const customerEmail = response.customer_email;

  if (status === "open") {
    //open: The payment failed or was canceled.
    router.push("/");
    return null;
  }

  if (status === "complete") {
    return (
      <div className="flex flex-col gap-2">
        <div className="  flex flex-row items-center gap-4">
          <Link
            href={"/ssrLanding"}
            className="bg-black text-white p-2 rounded-full"
          >
            <img src="/arrowLeft.svg" className="size-4"></img>
          </Link>
          <h3> View other courses</h3>
        </div>

        <div className="w-full flex flex-row items-center justify-center">
          <div className="h-[540px] w-[440px] flex flex-col justify-evenly p-4 items-center bg-white rounded-xl">
            <div>
              <img className="size-40" src="/success.svg"></img>
            </div>
            <h1 className="text-lg">
              "{thisCourse?.title}" added to{" "}
              <Link className="underline" href={"/myCourses"}>
                your courses
              </Link>
              .
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
