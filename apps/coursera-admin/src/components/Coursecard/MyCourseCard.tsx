"use client";

import { useRecoilState } from "recoil";
import { courseClickedState } from "state-store";

interface MyCourseCardProps {
  title?: string;
  description?: string;
  imageLink?: string;
  price?: number | string;
  adminUsername: string;
  courseId: number;
}

export const MyCourseCard: React.FC<MyCourseCardProps> = ({
  title,
  description,
  imageLink,
  price,
  adminUsername,
  courseId,
}) => {
  const [courseClicked, setCourseClicked] = useRecoilState(courseClickedState)

  const id = courseId
  return (
    <div
      onClick={() => {
        if(!courseClicked)
        window.location.assign(`/updateCourse/${id}`);
        setCourseClicked(true);
      }}
      className={`${courseClicked&&"animated-gradient-dark hover:cursor-not-allowed"} flex-shrink-0 w-[260px] h-[300px]  transition-all duration-300 ease-in-out border-[1.5px] border-black shadow bg-white ${!courseClicked&&"hover:cursor-pointer"} rounded-lg overflow-hidden flex flex-col group `}
    >
      <div className="relative">
        <img
          className="w-full h-[140px]  object-cover"
          src={imageLink}
          alt={title}
        />
        <div className="absolute  inset-0 bg-gradient-to-t from-black/60 to-black/20 group-hover:from-black/40 group-hover:to-transparent transition-all duration-300 ease-in-out"></div>
        {/*inset is for this div to be set in (over) the image, try various values to test. Also, inset is the combination of 'bottom', 'top', 'left', 'right'*/}
        <h2 className="absolute bottom-2 left-2 text-white font-bold xl:text-xl">
          {/*'bottom', 'left' are related to inset. These values can be used only when you are using 'relative' and 'absolute'*/}
          {title}
        </h2>
      </div>

      <div className="overflow-hidden px-[8px] p-[4px] xl:p-2">
        <p className="text-ellipsis line-clamp-2 xl:line-clamp-2 ">
          {description}
        </p>
      </div>
      <div className="xl:flex justify-start px-2 pt-4 hidden ">
        <h1 className="font-semibold">By {adminUsername}</h1>
      </div>
      <div className="mt-auto xl:p-2 px-2 flex flex-row justify-between">
        <div className="font-semibold xl:font-normal text-[#000000] py-2 text-md rounded">
          View Details
        </div>
        <div className="parent flex items-center">₹{price}/-</div>
      </div>
    </div>
  );
};
