"use client";

import { useRecoilState } from "recoil";
import { courseClickedState } from "state-store";

interface ViewAllButtonProps {
  query: string;
}

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({ query }) => {
  const [courseClicked, setCourseClicked] = useRecoilState(courseClickedState)
  const firstPage = 1;
  return (
    <div
      className="flex flex-row items-center"
      onClick={() => {
        setCourseClicked(true)
        window.location.assign(
          `/search?q=${encodeURIComponent(query)}&p=${firstPage}`
        );
      }}
    >
      <div className=" font-semibold ">View all</div>
      <img src="arrowRight.svg" className="w-8"></img>
    </div>
  );
};
