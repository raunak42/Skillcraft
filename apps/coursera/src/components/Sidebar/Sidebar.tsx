"use client";
import { useRecoilState } from "recoil";
import { sideBarOpenState } from "state-store";
import { CategoryCarousel } from "../CategoryCarousel/CategoryCarousel";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

export const NoSessionSidebar = () => {
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);

  useEffect(() => {
    if (sideBarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sideBarOpen]);

  const isMdScreen = useMediaQuery({ minWidth: 768 });
  useEffect(() => {
    if (isMdScreen) {
      //Because sidebar hides at md breakpoint
      document.body.classList.remove("no-scroll");
    }
    if (!isMdScreen && sideBarOpen) {
      document.body.classList.add("no-scroll");
    }
  }, [isMdScreen]);

  return (
    <div className="overflow-hidden">
      <div
        className={` transition-all duration-300 ease-in-out ${
          sideBarOpen ? "md:w-[270px] w-[340px]" : "w-0"
        }`}
      >
        <div className="flex flex-row items-center justify-between py-2 px-4">
          <div className="text-nowrap text-2xl font-semibold">Account</div>
          <img
            onClick={() => {
              setSideBarOpen(false);
            }}
            src="/cross.svg"
            className="size-12 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2"
          ></img>
        </div>
        <div className=" text-nowrap flex-col">
          <Link
          onClick={()=>setSideBarOpen(false)}
           href={"/login"}>
            <h3 className=" hover:bg-gray-200 hover:cursor-pointer pl-4 py-2">
              Login
            </h3>
          </Link>

          <Link
          onClick={()=>setSideBarOpen(false)}
           href={"/signup"}>
            <h3 className=" hover:bg-gray-200 hover:cursor-pointer pl-4 py-2">
              Signup
            </h3>
          </Link>
          <div>
            <div className="text-nowrap font-semibold px-4 pt-4 pb-2">
              Categories
            </div>
            <CategoryCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};
