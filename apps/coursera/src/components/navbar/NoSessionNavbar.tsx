"use client";
import { useState } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { useRecoilState } from "recoil";
import { sideBarOpenState } from "state-store";
import Link from "next/link";

const NoSessionNavbar = () => {
  const [searchIconClicked, setSearchIconClicked] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);

  return (
    <div className="flex flex-row justify-between items-center md:gap-4 border-b-[1.5px] border-b-black shadow-md p-2">
      {!searchIconClicked && (
        <div className="flex flex-row justify-between lg:justify-start w-full px-2 items-center">
          <img
            onClick={() => {
              setSideBarOpen(true);
            }}
            className="size-8 hover:cursor-pointer"
            src="hamburger.svg"
          ></img>
          <Link href={"/ssrLanding"}>
            <img
              className="w-[150px] md:w-[180px] lg:w-[210px] ml-8 hover:cursor-pointer"
              src="skillcraftLogo.svg"
            ></img>
          </Link>

          <div className="ml-8 hidden lg:block">
            <Searchbar />
          </div>
          <div className="ml-8 flex lg:hidden hover:cursor-pointer">
            <img
              onClick={() => {
                setSearchIconClicked(true);
              }}
              src="search.svg"
              className="size-6"
            ></img>
          </div>
        </div>
      )}
      {searchIconClicked && (
        <div className="w-full flex flex-row items-center justify-center">
          <div className="flex flex-row items-center justify-center h-8">
            <Searchbar />
            <img
              onClick={() => [setSearchIconClicked(false)]}
              src="cross.svg"
              className="size-12 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2"
            ></img>
          </div>
        </div>
      )}
      <div className="hidden md:flex flex-row justify-start items-center">
        <button className="border-none font-semibold text-black">
          Categories
        </button>
        <button className=" rounded-3xl bg-black text-white font-bold w-32 py-2 ml-12 hover:rounded-xl transition-all duration-200">
          Login
        </button>
        <button className="rounded-3xl py-2 w-32 ml-2 font-bold text-black border-[1.5px] border-black bg-white hover:rounded-xl transition-all duration-200">
          Signup
        </button>
      </div>
    </div>
  );
};

export default NoSessionNavbar;
