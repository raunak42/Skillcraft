"use client";
import { getUser, lucia, validateRequest } from "@/auth";
import { Lucia } from "lucia";

export interface CourseAttributes {
  title: string;
  description: string;
  imageLink: string;
  price: number;
  published: boolean;
}

export default async function testApiRoutes() {
  //   const details = await validateRequest();
  //   console.log(details);

  const newCourse: CourseAttributes = {
    title: "Black Holes",
    description: "Are you ready to get spaghettified?",
    imageLink: "oifnoie",
    price: 3999,
    published: false,
  };

  const makeApiCall = async () => {
    await fetch("/api/createCourse", {
      method: "POST",
      body: JSON.stringify(newCourse),
    });
  };

  return <button onClick={makeApiCall}>Make call</button>;
}
