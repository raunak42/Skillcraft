"use client";
import { getUser, lucia, validateRequest } from "@/auth";
import { Lucia } from "lucia";

export default async function testApiRoutes() {
  //   const details = await validateRequest();
  //   console.log(details);
  const makeApiCall = async () => {
    await fetch("/api/buyCourse/1", {
      method: "POST",
      // body: JSON.stringify({ userId: "world" }),
    });
  };

  return <button onClick={makeApiCall}>Make call</button>;
}
