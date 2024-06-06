"use client";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  avatarState,
  courseClickedState,
  sideBarOpenState,
  adminDetailsState,
  usernameState,
} from "state-store";
import { ApiResponseAttributes } from "types";
import { Session, User } from "lucia";

interface SessionNavbarProps {
  session: Session | null;
  authUser: User | null;
}

export const SessionNavbar: React.FC<SessionNavbarProps> = ({
  session,
  authUser,
}) => {
  const setSideBarOpen = useSetRecoilState(sideBarOpenState);
  const setIsLoading = useSetRecoilState(courseClickedState);
  const [avatar, setAvatar] = useRecoilState(avatarState);
  const setUsername = useSetRecoilState(usernameState);
  const setUserDetials = useSetRecoilState(adminDetailsState);

  const fetchData = async () => {
    const res = await fetch(`/api/me`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        data: { session, user: authUser },
      }),
    });

    const response: ApiResponseAttributes = await res.json();
    const admin = response.data?.admin;

    if (!admin) {
      return;
    }

    setAvatar(admin.avatar as string);
    setUsername(admin.username as string);
    setUserDetials(admin);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            {avatar && (
              <img className="size-10 rounded-full" src={avatar}></img>
            )}
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
