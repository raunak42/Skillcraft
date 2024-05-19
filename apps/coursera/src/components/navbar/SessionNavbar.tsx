"use client";
import { useEffect, useRef, useState } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { useRecoilState } from "recoil";
import { avatarState, sideBarOpenState, usernameState } from "state-store";
import { CategoryCarousel } from "../CategoryCarousel/CategoryCarousel";
import { useMediaQuery } from "react-responsive";
import { ApiResponseAttributes } from "types";
import { Session, User } from "lucia";

interface SessionNavbarProps {
  session: Session | null;
  authUser: User | null;
}

const SessionNavbar: React.FC<SessionNavbarProps> = ({ session, authUser }) => {
  const [searchIconClicked, setSearchIconClicked] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
  const [showDropDown, setShowDropDown] = useState(false);
  const [response, setResponse] = useState<ApiResponseAttributes>();
  const [avatar, setAvatar] = useRecoilState(avatarState);
  const [username, setUsername] = useRecoilState(usernameState);

  const fetchData = async () => {
    const res = await fetch(`/api/me`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        data: { session, user: authUser },
      }),
    });

    const response: ApiResponseAttributes = await res.json();
    console.log(response);
    setResponse(response);
    const user = response.data?.user;
    setAvatar(user?.avatar as string);
    setUsername(user?.username as string);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const user = response?.data?.user;
  // const avatar = user?.avatar;

  // if(!response){
  //   return<div>Loading...</div>
  // }

  // const user = response.user

  const categoriesRef = useRef<HTMLDivElement | null>(null);

  const isLargeScreen = useMediaQuery({ minWidth: 1024 }); //lg breakpoint
  const isMdScreen = useMediaQuery({ minWidth: 768 }); //md breakpoint

  useEffect(() => {
    if (isLargeScreen) {
      setSearchIconClicked(false);
    }
  }, [isLargeScreen]);

  return (
    <div className="flex flex-col relative">
      <div className="px-2 sm:px-4 md:px-6 flex flex-row justify-between items-center md:gap-4  border-b-[1.5px] border-b-black shadow-md p-2">
        <div className="w-full md:w-[68%] lg:w-full ">
          {!searchIconClicked && (
            <div className="  h-8 lg:h-10 flex flex-row justify-between gap-2 lg:justify-start lg:gap-4 w-full items-center">
              <div className="flex flex-row items-center">
                {/* <img className="size-2" src="/arrowDown.svg"></img> */}

                <div
                  onClick={() => {
                    setSideBarOpen(true);
                  }}
                  className=" hover:bg-gray-200 hover:cursor-pointer p-[6px] rounded-full flex flex-row items-center justify-center"
                >
                  <div
                    className={`${!response && "animated-gradient"}  overflow-hidden shrink-0  size-8 lg:size-[36px] rounded-full  flex flex-row items-center justify-center`}
                  >
                    {response && (
                      <img className="size-full" src={avatar as string}></img>
                    )}
                    {!response && (
                      <div
                        className="size-full bg-gray-300 rounded-full"
                        // src="/emptyAvatar.svg"
                      ></div>
                    )}
                  </div>
                </div>
              </div>

              <a className="" href={"/ssrLanding"}>
                <img
                  className="w-[150px] md:w-[180px] lg:w-[260px]  hover:cursor-pointer"
                  src="/skillcraftLogo.svg"
                ></img>
              </a>
              <div className="ml-8 hidden lg:block w-full">
                <Searchbar />
              </div>
              <div className=" flex hover:bg-gray-200 p-2 rounded-full lg:hidden hover:cursor-pointer">
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
        </div>
        <div className=" md:w-[32%] lg:w-[30%] xl:w-[25%] hidden md:flex flex-row  items-center justify-between  w-[30%] mr-4">
          <div
            ref={categoriesRef}
            onMouseEnter={() => setShowDropDown(true)}
            onMouseLeave={() => setShowDropDown(false)}
          >
            <div className=" border-none font-semibold text-black hover:cursor-pointer">
              Categories
            </div>
          </div>
          <div className="hover:bg-gray-200 rounded-full p-[4px] flex flex-row items-center justify-center gap-8 mr-[8px]">
            <div className="size-8">
              <img className=" hover:cursor-pointer" src="/heart.svg"></img>
            </div>
          </div>
          <div className="hover:bg-gray-200 rounded-full p-[4px] flex flex-row gap-8 mr-[8px]">
            <div className="size-9">
              <img className=" hover:cursor-pointer" src="/cart1.svg"></img>
            </div>
          </div>
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
          <CategoryCarousel />
        </div>
      )}
    </div>
  );
};

export default SessionNavbar;
