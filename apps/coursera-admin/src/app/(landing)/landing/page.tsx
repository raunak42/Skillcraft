"use client";
import { courseFromDb } from "@/native-types/types";
import { useEffect, useState } from "react";
import Loading from "./loading";

const Page = () => {
  const [data, setData] = useState<courseFromDb[] | null>(null);

  async function fetchData() {
    const res = await fetch("/api/getCourses", { method: "GET" });
    const courses = await res.json();
    setData(courses);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return<Loading></Loading>;
  }

  // throw new Error, any kind of error will trigger error.tsx
  return (
    <div>
      {data.map((course: courseFromDb) => (
        <div key={course.id}>
          <h6>{course.title}</h6>
        </div>
      ))}
    </div>
  );
};

export default Page;
