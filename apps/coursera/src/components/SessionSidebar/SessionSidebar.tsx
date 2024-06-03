"use client";
import { useRecoilState } from "recoil";
import {
  avatarState,
  sideBarOpenState,
  userDetailsState,
  usernameState,
} from "state-store";
import { CategoryCarousel } from "../CategoryCarousel/CategoryCarousel";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ADMIN_BASE_URL_DEV } from "@/lib/constants";

export const SessionSidebar = () => {
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
  const [avatar, setAvatar] = useRecoilState(avatarState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userDetailsState);
  const [listItems, setListItems] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<number | null>(null);

  useEffect(() => {
    setListItems(user?.wishList?.length!);
    setCartItems(user?.cart?.length!);
    if (sideBarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sideBarOpen]);

  return (
    <div
      className={` transition-all duration-300 ease-in-out overflow-hidden h-full fixed left-0 z-30 bg-white overflow-y-auto pb-20 ${
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
      <div className=" text-nowrap flex-col shrink-0">
        <div
          className=" flex flex-row items-center pl-2 py-[10px]"
          // onClick={() => {
          //   // setSideBarOpen(false);
          //   setIsLoading(true);
          // }}
          // href={"/settings"}
        >
          {avatar && (
            <div className="shrink-0 size-[34px]">
              <img className="rounded-full" src={avatar}></img>
            </div>
          )}
          {!avatar && (
            <div className="shrink-0 rounded-full bg-gray-300 size-[34px] flex flex-row items-center justify-center">
              <img className="size-5" src={"/emptyAvatar.svg"}></img>
            </div>
          )}

          <div className="pl-2 flex flex-col">
            {/* <h3>Username</h3> */}
            {username && (
              <h3 className=" text-xs text-gray-600 font-semibold">
                {username}
              </h3>
            )}
            {!username && (
              <div className="w-[180px] h-[12px] rounded-md bg-gray-300 text-xs text-gray-600 font-semibold"></div>
            )}
          </div>
        </div>
        <a
          className="relative flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-2 py-[10px]"
          onClick={() => {
            // setSideBarOpen(false);
            setIsLoading(true);
          }}
          href={"/wishlist"}
        >
          <div className="shrink-0 size-8">
            <img src="/heart.svg"></img>
          </div>
          {listItems !== 0 && (
            <div
              className={`absolute bottom-[28px] left-[32px] ${listItems && "bg-red-600"} flex flex-row items-center justify-center size-[15px] p-[2px] rounded-full text-xs text-white font-semibold`}
            >
              <h1 className="pt-[2px]">{listItems}</h1>
            </div>
          )}
          <h3 className="pl-2">Wishlist</h3>
        </a>
        <a
          className="relative flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-2 py-[10px]"
          onClick={() => {
            // setSideBarOpen(false);
            setIsLoading(true);
          }}
          href={"/cart"}
        >
          <div className="shrink-0 size-8">
            <img src="/cart1.svg"></img>
          </div>
          {cartItems !== 0 && (
            <div
              className={`absolute bottom-[28px] left-[32px] ${cartItems && "bg-red-600"} flex flex-row items-center justify-center size-[15px] p-[2px] rounded-full text-xs text-white font-semibold`}
            >
              <h1 className="pt-[2px]">{cartItems}</h1>
            </div>
          )}
          <h3 className="pl-2">Cart</h3>
        </a>
        <a
          className="flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-[12px] py-[10px]"
          onClick={() => {
            // setSideBarOpen(false);
            setIsLoading(true);
          }}
          href={"/myCourses"}
        >
          <div className="shrink-0 size-[26px]">
            <img src="/hat.svg"></img>
          </div>
          <h3 className="pl-[10px]">My courses</h3>
        </a>
        <a
          className="flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer pl-[16px] py-[11px]"
          onClick={() => {
            // setSideBarOpen(false);
            setIsLoading(true);
          }}
          href={"/signout"}
        >
          <div className="shrink-0 size-[22px]">
            <img src="/logout.svg"></img>
          </div>
          <h3 className="pl-[10px]">Logout</h3>
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
  );
};
