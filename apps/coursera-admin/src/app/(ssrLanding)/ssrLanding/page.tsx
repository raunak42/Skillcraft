import { courseFromDb } from "@/native-types/types";
import React from "react";

export default async function Page() {
  const res = await fetch(`http://localhost:3001/api/getCourses`, {
    cache: "no-store",
  });
  const data: courseFromDb[] = await res.json();
  // throw new Error(); any kind of error here will trigger the error.tsx file
  return (
    <div>
      {data.map((course) => (
        <div key={course.id}>
          <h6>{course.title}</h6>
        </div>
      ))}
    </div>
  );
}
