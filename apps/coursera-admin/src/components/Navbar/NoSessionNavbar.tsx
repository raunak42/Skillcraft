"use client";
import { useEffect, useRef, useState } from "react";
// import { Searchbar } from "../Searchbar/Searchbar";
import { useRecoilState } from "recoil";
import { courseClickedState, sideBarOpenState } from "state-store";
import Link from "next/link";
// import { CategoryCarousel } from "../CategoryCarousel/CategoryCarousel";
import { useMediaQuery } from "react-responsive";

const NoSessionNavbar = () => {
  const [searchIconClicked, setSearchIconClicked] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
  const [showDropDown, setShowDropDown] = useState(false);
  const [loginClicked, setLoginClicked] = useState<boolean>(false);
  const [signupClicked, setSignupClicked] = useState<boolean>(false);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useRecoilState(courseClickedState);

  const isLargeScreen = useMediaQuery({ minWidth: 1024 }); //lg breakpoint
  useEffect(() => {
    if (isLargeScreen) {
      setSearchIconClicked(false);
    }
  }, [isLargeScreen]);

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-row justify-between items-center md:gap-4 border-b-[1.5px] border-b-black shadow-md p-2">
        {(
          <div className="flex flex-row justify-between lg:justify-start lg:gap-4 w-full px-2 items-center">
            <a className="" href={"/ssrLanding"}>
            <img
              className="w-[120px] md:w-[160px] ml-4 hover:cursor-pointer"
              src="/skillcraft-admin.svg"
            ></img>
          </a>
          </div>
        )}
        <div className="flex flex-row justify-start items-center">

          <a
            onClick={() => {
              setLoginClicked(true);
            }}
            href={"/login/fresh"}
            className=" text-sm sm:text-base flex flex-row items-center justify-center rounded-3xl bg-black text-white font-bold w-[74px] h-8 sm:w-32 sm:h-10 py-2 ml-12 hover:rounded-xl transition-all duration-200"
          >
            {loginClicked && (
              <div className="size-4 animate-spin">
                <img src="/spinner.svg"></img>
              </div>
            )}
            {!loginClicked && "Login"}
          </a>
          <a
            onClick={() => {
              setSignupClicked(true);
            }}
            href={"/signup/fresh/0"}
            className="text-sm sm:text-base  flex flex-row items-center justify-center rounded-3xl py-2 w-[74px] h-8 sm:w-32 sm:h-10 ml-2 font-bold text-black border-[1.5px] border-black bg-white hover:rounded-xl transition-all duration-200"
          >
            {signupClicked && (
              <div className="size-5 animate-spin">
                <img src="/spinnerBlack.svg"></img>
              </div>
            )}
            {!signupClicked && "Signup"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoSessionNavbar;
