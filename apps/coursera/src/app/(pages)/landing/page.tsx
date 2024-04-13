"use client";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { ApiResponseAttributes, PrismaCourseOutput } from "types";

interface CourseCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  if (!title || !description || !imageUrl) {
    return <div>No courses available</div>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-8 border border-gray-300">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={imageUrl}
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <h2 className="absolute bottom-2 left-4 text-white text-xl font-bold">
          {title}
        </h2>
      </div>
      <div className="p-6">
        <p className="text-gray-700 text-base mb-4">{description}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Enroll Now
        </button>
      </div>
      <div className="absolute top-4 right-4">

      </div>
    </div>
  );
};

const Page = () => {
  const [data, setData] = useState<PrismaCourseOutput<{}>[] | null>(null);

  async function fetchData() {
    const variable = await fetch("/api/getCourses", { method: "GET" });
    const response: ApiResponseAttributes = await variable.json();
    if (response.data?.courses) {
      setData(response.data.courses);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      {data.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title ?? ""}
          description={course.description ?? ""}
          imageUrl={course.imageLink ?? ""}
        />
      ))}
    </div>
  );
};

export default Page;