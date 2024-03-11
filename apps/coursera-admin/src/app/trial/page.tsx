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
    title: "Physics of the impossible",
    description: "Theory will take you only so far.",
    imageLink: "https://www.science.org.au/curious/sites/default/files/images/space-and-time/gravity/warping-spacetime-ligo.jpg",
    price: 11199,
    published: true,
  };

  const makeApiCall = async () => {
    await fetch("/api/editCourse/9813", {
      method: "PUT",
      body: JSON.stringify(newCourse),
    });
  };

  return <button onClick={makeApiCall}>Make call</button>;
}
