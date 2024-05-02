"use client";
import { useEffect, useRef, useState } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { useRecoilState } from "recoil";
import { sideBarOpenState } from "state-store";
import Link from "next/link";
import { CategoryCarousel } from "../CategoryCarousel/CategoryCarousel";
import { useMediaQuery } from 'react-responsive'

const NoSessionNavbar = () => {
  const [searchIconClicked, setSearchIconClicked] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
  const [showDropDown, setShowDropDown] = useState(false);
  const categoriesRef = useRef<HTMLDivElement | null>(null);

  const isLargeScreen = useMediaQuery({ minWidth: 1024 }); //lg breakpoint
  useEffect(() => {
    if (isLargeScreen) {
      setSearchIconClicked(false);
    }
  }, [isLargeScreen]);

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-row justify-between items-center md:gap-4 border-b-[1.5px] border-b-black shadow-md p-2">
        {!searchIconClicked && (
          <div className="flex flex-row justify-between lg:justify-start lg:gap-4 w-full px-2 items-center">
            <div
              onClick={() => {
                setSideBarOpen(true);
              }}
              className=" size-8 rounded-full border border-black flex flex-row items-center justify-center md:hidden"
            >
              <img
                className="size-4 hover:cursor-pointer"
                src="/emptyAvatar.svg"
              ></img>
            </div>

            <Link href={"/ssrLanding"}>
              <img
                className="w-[150px] md:w-[180px] lg:w-[210px] ml-4 hover:cursor-pointer"
                src="/skillcraftLogo.svg"
              ></img>
            </Link>

            <div className="ml-8 hidden lg:block w-full">
              <Searchbar />
            </div>
            <div className="ml-8 flex lg:hidden hover:cursor-pointer">
              <img
                onClick={() => {
                  setSearchIconClicked(true);
                }}
                src="/search.svg"
                className="size-6"
              ></img>
            </div>
          </div>
        )}
        {searchIconClicked && (
          <div className="w-full flex flex-row items-center justify-center">
            <div className="flex flex-row items-center justify-center h-8 w-full">
              <Searchbar />
              <img
                onClick={() => [setSearchIconClicked(false)]}
                src="/cross.svg"
                className="size-12 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2"
              ></img>
            </div>
          </div>
        )}
        <div className="hidden md:flex flex-row justify-start items-center">
          <div
            ref={categoriesRef}
            onMouseEnter={() => setShowDropDown(true)}
            onMouseLeave={() => setShowDropDown(false)}
          >
            <div className=" border-none font-semibold text-black hover:cursor-pointer">
              Categories
            </div>
          </div>

          <Link href={"/login"} className=" flex flex-row items-center justify-center rounded-3xl bg-black text-white font-bold w-32 py-2 ml-12 hover:rounded-xl transition-all duration-200">
            Login
          </Link>
          <Link href={"/signup"} className="flex flex-row items-center justify-center rounded-3xl py-2 w-32 ml-2 font-bold text-black border-[1.5px] border-black bg-white hover:rounded-xl transition-all duration-200">
            Signup
          </Link>     
        </div>
      </div>
      {categoriesRef.current && (
        <div
          onMouseEnter={() => setShowDropDown(true)}
          onMouseLeave={() => setShowDropDown(false)}
          style={{
            left: categoriesRef.current.offsetLeft,
          }}
          className={`overflow-y-auto rounded-lg absolute top-[64px] h-[410px] w-[250px] bg-white border-[1.5px] border-black transition-all duration-300 
          ${showDropDown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"} 
          ${showDropDown ? "visible" : "invisible"}
          `}
        >
          <CategoryCarousel/>
        </div>
      )}
    </div>
  );
};

export default NoSessionNavbar;
