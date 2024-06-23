"use client";

import { useRecoilState } from "recoil";
import { courseClickedState } from "state-store";

interface CourseCardHzProps {
  imageLink: string;
  title: string;
  description: string;
  price: number;
  id: number;
}

export const CourseCardHz: React.FC<CourseCardHzProps> = ({
  imageLink,
  title,
  description,
  price,
  id,
}) => {
  const [courseClicked, setCourseClicked] = useRecoilState(courseClickedState);

  return (
    <div
      onClick={() => {
        if(!courseClicked)
        window.location.assign(`/course/${id}`);
        setCourseClicked(true)
      }}
      className={`${courseClicked && "animated-gradient-dark hover:cursor-not-allowed"} bg-[#ffffff] border-[1.5px] rounded-2xl overflow-hidden w-[96%] hover:w-[99%] ${!courseClicked&&"hover:cursor-pointer"}  transition-all duration-300 ease-in-out mx-auto flex flex-row border-black`}
    >
      <div className="relative w-[55%] sm:w-[40%] md:w-[30%] lg:w-[55%]">
        <img className=" object-cover h-[110px] w-full" src={imageLink} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="flex flex-col w-full px-2 pt-[4px]">
        <h2 className="text-black font-semibold">{title}</h2>
        <h4 className="text-black text-xs line-clamp-2">{description}</h4>
        <div className="flex flex-row justify-between mt-auto">
          <h1 className="font-semibold">View more</h1>
          <h1>₹{price}/-</h1>
        </div>
      </div>
    </div>
  );
};
