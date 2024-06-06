"use client";
import { MyCourseCard } from "@/components/Coursecard/MyCourseCard";
import { adminDetailsState } from "state-store";
import { useRecoilState } from "recoil";
import { CourseCard } from "@/components/Coursecard/CourseCard";
import { CCSkeleton } from "@/components/Coursecard/CCSkeleton";

interface ThisCourseProps {
  courseId: string;
}

export const ThisCourse: React.FC<ThisCourseProps> = ({ courseId }) => {
  const [userDetails, setUserDetials] = useRecoilState(adminDetailsState);
  const courses = userDetails?.createdCourses;

  const thisCourse = courses?.find((course) => {
    return course.id.toString() === courseId;
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {thisCourse && (
        <CourseCard adminUsername={thisCourse?.admin?.username!} />
      )}
      {!thisCourse && <CCSkeleton />}
    </div>
  );
};
