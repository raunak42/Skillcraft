"use client";
import { useEffect, useRef, useState } from "react";
// import { Searchbar } from "../Searchbar/Searchbar";
import { useRecoilState } from "recoil";
import {
  avatarState,
  courseClickedState,
  sideBarOpenState,
  adminDetailsState,
  usernameState,
} from "state-store";
import Link from "next/link";
// import { CategoryCarousel } from "../CategoryCarousel/CategoryCarousel";
import { useMediaQuery } from "react-responsive";
import { ApiResponseAttributes, PrismaUserOutput } from "types";
import { Session, User } from "lucia";

interface SessionNavbarProps {
  session: Session | null;
  authUser: User | null;
}

export const SessionNavbar: React.FC<SessionNavbarProps> = ({
  session,
  authUser,
}) => {
  const [searchIconClicked, setSearchIconClicked] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
  const [showDropDown, setShowDropDown] = useState(false);
  const [loginClicked, setLoginClicked] = useState<boolean>(false);
  const [signupClicked, setSignupClicked] = useState<boolean>(false);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useRecoilState(courseClickedState);
  const [avatar, setAvatar] = useRecoilState(avatarState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [response, setResponse] = useState<ApiResponseAttributes>();
  const [userDetails, setUserDetials] = useRecoilState(adminDetailsState);

  const isSmScreen = useMediaQuery({ minWidth: 640 }); //sm breakpoint
  // const isXsScreen = useMediaQuery({ minWidth: 360 } ); //sm breakpoint
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }); //lg breakpoint

  const fetchData = async () => {
    const res = await fetch(`/api/me`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        data: { session, user: authUser },
      }),
    });

    const response: ApiResponseAttributes = await res.json();
    setResponse(response);
    const admin = response.data?.admin;
    setAvatar(admin?.avatar as string);
    setUsername(admin?.username as string);
    setUserDetials(admin!);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      setSearchIconClicked(false);
    }
  }, [isLargeScreen]);

  return (
    <div className="relative">
      <div
        className={`flex flex-row items-center justify-between gap-10 border-b-[1.5px] border-b-black shadow-md py-1 px-4`}
      >
        <div className="w-full flex flex-row items-center justify-between sm:justify-start sm:gap-6">
          <div
            onClick={() => {
              setSideBarOpen(true);
            }}
            className="hover:cursor-pointer hover:bg-gray-300 rounded-full bg-gray-200 size-12 flex flex-row items-center justify-center"
          >
            {avatar && <img className="size-10 rounded-full" src={avatar}></img>}
            {!avatar && <img className="size-6" src={"/emptyAvatar.svg"}></img>}
          </div>

          <a className="" href={"/create"}>
            <img
              className="w-[120px] md:w-[160px] ml-4 hover:cursor-pointer"
              src="/skillcraft-admin.svg"
            ></img>
          </a>
          {
            <a
              className="sm:hidden"
              href="/myCourses"
              onClick={() => {
                setIsLoading(true);
              }}
            >
              <div className="hover:bg-gray-200 size-12 flex items-center justify-center rounded-full">
                <img src="/hat.svg" className="size-6"></img>
              </div>
            </a>
          }
        </div>

        <div
          onClick={() => {
            setIsLoading(true);
          }}
          className="sm:flex flex-row items-center hidden"
        >
          {
            <a className="hidden sm:block" href="/myCourses">
              <div className=" font-semibold hover:cursor-pointer size-12 flex items-center justify-center w-[120px]">
                My teachings
              </div>
            </a>
          }
        </div>
      </div>
    </div>
  );
};

export default SessionNavbar;
