"use client";
import { useRecoilState } from "recoil";
import { sideBarOpenState } from "state-store";
import { CategoryCarousel } from "../CategoryCarousel/CategoryCarousel";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { ADMIN_BASE_URL_DEV } from "@/lib/constants";

export const NoSessionSidebar = () => {
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (sideBarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sideBarOpen]);

  return (
    <div
      className={` transition-all duration-300 ease-in-out overflow-hidden h-full fixed left-0 top-0 bottom-0 z-30 bg-white overflow-y-auto pb-20 ${
        sideBarOpen ? "w-full sm:w-[340px]" : "w-0"
      }`}
    >
      <div className="flex flex-row items-center justify-between py-2 px-4">
        <div className="text-nowrap text-2xl font-semibold">Account</div>
        <div className="flex flex-row items-center">
          {isLoading && (
            <img src="/spinnerBlack.svg" className="size-8 animate-spin"></img>
          )}
          <img
            onClick={() => {
              setSideBarOpen(false);
            }}
            src="/cross.svg"
            className="size-12 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2"
          ></img>
        </div>
      </div>
      <div className=" text-nowrap flex-col">
        <a onClick={() => setIsLoading(true)} href={"/login/fresh"}>
          <h3 className=" hover:bg-gray-200 hover:cursor-pointer pl-4 py-2">
            Login
          </h3>
        </a>

        <a onClick={() => setIsLoading(true)} href={"/signup/fresh/0"}>
          <h3 className=" hover:bg-gray-200 hover:cursor-pointer pl-4 py-2">
            Signup
          </h3>
        </a>
        <a
            target="_blank"
            className="flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-[12px] py-[11px]"
            href={`${ADMIN_BASE_URL_DEV}/login/fresh`}
          >
            <div className="shrink-0 w-[100px] border border-black p-1">
              <img src="/skillcraft-admin.svg"></img>
            </div>
            {/* <h3 className="pl-[10px]">ADMIN</h3> */}
          </a>
        <div>
          <div>
            <div className="text-nowrap font-semibold px-4 pt-4 pb-2">
              Categories
            </div>
            <div
              onClick={() => {
                setIsLoading(true);
              }}
            >
              <CategoryCarousel />
            </div>
            <div className="pl-2">
              {isLoading && (
                <img
                  src="/spinnerBlack.svg"
                  className="size-8 animate-spin"
                ></img>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
