"use client";
import { useRecoilState } from "recoil";
import { avatarState, sideBarOpenState, usernameState } from "state-store";
import { CategoryCarousel } from "../CategoryCarousel/CategoryCarousel";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

export const SessionSidebar = () => {
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
  const [avatar, setAvatar] = useRecoilState(avatarState);
  const [username, setUsername] = useRecoilState(usernameState);

  useEffect(() => {
    if (sideBarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sideBarOpen]);

  const isMdScreen = useMediaQuery({ minWidth: 768 });
  // useEffect(() => {
  //   if (isMdScreen) {
  //     //Because sidebar hides at md breakpoint
  //     document.body.classList.remove("no-scroll");
  //   }
  //   if (!isMdScreen && sideBarOpen) {
  //     document.body.classList.add("no-scroll");
  //   }
  // }, [isMdScreen]);

  return (
    <div className="overflow-hidden">
      <div
        className={` transition-all duration-300 ease-in-out ${
          sideBarOpen ? "md:w-[360px] w-[340px]" : "w-0"
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
        <div className=" text-nowrap flex-col shrink-0">
          <Link
            className=" flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-2 py-[10px]"
            onClick={() => setSideBarOpen(false)}
            href={"/signup"}
          >
            {avatar && (
              <div className="shrink-0 size-[34px]">
                <img className="rounded-full" src={avatar}></img>
              </div>
            )}
            {!avatar && (
              <div className="shrink-0 rounded-full bg-gray-300 size-[34px]">
                {/* <img className="rounded-full" src={avatar}></img> */}
              </div>
            )}

            <div className=" pl-2 flex flex-col">
              <h3>Account settings</h3>
              {username && (
                <h3 className=" text-xs text-gray-600 font-semibold">
                  {username}
                </h3>
              )}
              {!username && (
                <div className="w-[180px] h-[12px] rounded-md bg-gray-300 text-xs text-gray-600 font-semibold"></div>
              )}
            </div>
          </Link>
          <Link
            className=" flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-2 py-[10px]"
            onClick={() => setSideBarOpen(false)}
            href={"/signup"}
          >
            <div className="shrink-0 size-8">
              <img src="/heart.svg"></img>
            </div>
            <h3 className="pl-2">Wishlist</h3>
          </Link>
          <Link
            className="flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-2 py-[10px]"
            onClick={() => setSideBarOpen(false)}
            href={"/signup"}
          >
            <div className="shrink-0 size-8">
              <img src="/cart1.svg"></img>
            </div>
            <h3 className="pl-2">Cart</h3>
          </Link>
          <Link
            className="flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-[12px] py-[10px]"
            onClick={() => setSideBarOpen(false)}
            href={"/myCourses"}
          >
            <div className="shrink-0 size-[26px]">
              <img src="/hat.svg"></img>
            </div>
            <h3 className="pl-[10px]">My courses</h3>
          </Link>
          <Link
            className="flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-[16px] py-[11px]"
            onClick={() => setSideBarOpen(false)}
            href={"/signout"}
          >
            <div className="shrink-0 size-[22px]">
              <img src="/logout.svg"></img>
            </div>
            <h3 className="pl-[10px]">Logout</h3>
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
