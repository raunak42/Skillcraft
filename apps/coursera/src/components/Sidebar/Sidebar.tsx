"use client";

import { useRecoilState } from "recoil";
import { sideBarOpenState } from "state-store";
import { CategoryCarousel } from "../CategoryCarousel/CategoryCarousel";
import { useEffect } from "react";

export const Sidebar = () => {
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);

  useEffect(() => {
    if (sideBarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sideBarOpen]);

  return (
    <div className="overflow-hidden">
      <div
        className={` transition-all duration-300 ease-in-out ${
          sideBarOpen ? "md:w-[270px] w-[340px]" : "w-0"
        }`}
      >
        <div className="flex flex-row items-center justify-between py-2 px-4">
          <div className="text-nowrap text-2xl font-semibold">Main menu</div>
          <img
            onClick={() => {
              setSideBarOpen(false);
            }}
            src="cross.svg"
            className="size-12 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2"
          ></img>
        </div>
        <div className=" text-nowrap flex-col">
          <h3 className=" hover:bg-gray-200 hover:cursor-pointer pl-4 py-2">Login</h3>
          <h3 className=" hover:bg-gray-200 hover:cursor-pointer pl-4 py-2">Signup</h3>
          <div>
          <div className="text-nowrap font-semibold px-4 pt-4">Categories</div>
            <CategoryCarousel/>
          </div>
        </div>
      </div>
    </div>
  );
};
