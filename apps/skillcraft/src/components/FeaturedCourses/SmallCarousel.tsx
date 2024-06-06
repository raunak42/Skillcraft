import { featuredCourses } from "types";
import { CourseCard } from "../Coursecard/CourseCard";

interface SmallCourseProps {
  object: featuredCourses;
}

export const SmallCarousel: React.FC<SmallCourseProps> = ({ object }) => {
  return (
    <div className="flex flex-row overflow-x-auto no-scrollbar space-x-4 mt-2">
      {object.courses.map((course) => (
        <div
          className={`relative`}
          key={course.id}
        >
          <CourseCard
            key={course.id}
            title={course.title}
            imageLink={course.imageLink as string}
            description={course.description as string}
            price={course.price}
            adminUsername={course.admin?.username as string}
            courseId={course.id as number}
          />
        </div>
      ))}
    </div>
  );
};
