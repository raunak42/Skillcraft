"use client";

import { useRecoilState } from "recoil";
import { sideBarOpenState } from "state-store";

export const Sidebar = () => {
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);

  return (
    <div>
      <div
        className={` transition-all duration-300 ease-in-out ${
          sideBarOpen ? "md:w-[270px] w-[480px]" : "w-0"
        }`}
      >
        <div className="flex flex-row items-center justify-end">
          <img
            onClick={() => {
              setSideBarOpen(false);
            }}
            src="cross.svg"
            className="size-12 hover:cursor-pointer hover:bg-gray-300 rounded-full p-2"
          ></img>
        </div>
      </div>
    </div>
  );
};
