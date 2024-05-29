"use client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { sideBarOpenState, adminDetailsState } from "state-store";

export const Sidebar = () => {
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
  const [userDetails, setUserDetials] = useRecoilState(adminDetailsState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  const avatar = userDetails?.avatar;

  return (
    <div
      className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out h-full fixed left-0 bg-white border-r-[1.5px] border-black ${
        sideBarOpen ? "w-full sm:w-[320px]" : "w-[0px]"
      } z-30`}
    >
      <div className=" flex flex-row items-center justify-between p-2">
        <div className="flex flex-row items-center gap-1" >
          <div className=" rounded-full bg-gray-200 size-10 flex flex-row items-center justify-center">
            {avatar && <img className="size-8 rounded-full" src={avatar}></img>}
            {!avatar && <img className="size-6" src={"/emptyAvatar.svg"}></img>}
          </div>
          <h1 className="text-gray-400 text-xs font-semibold" >{userDetails?.username}</h1>
        </div>

        <div
          onClick={() => {
            setSideBarOpen(false);
          }}
          className="shrink-0 text-nowrap size-12 hover:cursor-pointer hover:bg-gray-200 rounded-full flex items-center justify-center"
        >
          {!isLoading&&<img className=" size-8 rounded-full" src="/cross.svg"></img>}
          {isLoading&&<img className=" size-8 rounded-full animate-spin" src="/spinnerBlack.svg"></img>}
        </div>
      </div>

      <div onClick={()=>{
        setIsLoading(true)
      }} className="flex flex-col" >
        <a href="/create" className="shrink-0 text-nowrap flex flex-row items-center gap-4 hover:bg-gray-200 p-4 hover:cursor-pointer" >
            <img src="/hat.svg" className="size-6" ></img>
            Create</a>
        <a href="/myCourses" className="shrink-0 text-nowrap flex flex-row items-center gap-4 hover:bg-gray-200 p-4 hover:cursor-pointer" >
            <img src="/teacher.svg" className="size-7" ></img>
            My teachings</a>
        <a href="/signout" className="shrink-0 text-nowrap flex flex-row items-center gap-4 hover:bg-gray-200 p-4 hover:cursor-pointer" >
            <img src="/logout.svg" className="size-[22px] ml-[4px]" ></img>
            Logout</a>

      </div>
    </div>
  );

  if (!sideBarOpen) {
    return null;
  }
};
