"use client";
import Link from "next/link";
import { useState } from "react";
import { Session } from "lucia";
import { redirect } from "next/navigation";
import Image from "next/image";

interface LoginProps {
  buttonText: string;
}
export const Login: React.FC<LoginProps> = ({ buttonText }) => {
  const [githubClicked, setGithubClicked] = useState<boolean>(false);
  const [googleClicked, setGoogleClicked] = useState<boolean>(false);
  const [buttonClicked, setButtonCLicked] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="w-[330px] h-[410px] sm:w-[440px] sm:h-[360px] border-[1.5px] border-black rounded-xl bg-white flex flex-col gap-8 sm:gap-8">
        <div className="flex flex-col items-center w-full pt-4 gap-2">
          <div className="w-[90%]">
            <h1 className="">Username</h1>
            <input
              onChange={(event) => {
                setUsername(event.currentTarget.value);
              }}
              autoFocus={true}
              name="username"
              id="username"
              placeholder=""
              className="bg-gray-100 w-full h-[40px] rounded-full px-4"
            ></input>
          </div>
          <div className="w-[90%]">
            <h1 className="">Password</h1>
            <input
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
              name="password"
              id="password"
              type="password"
              placeholder=""
              className="bg-gray-100 w-full h-[40px] rounded-full px-4"
            ></input>
          </div>
          <button
            onClick={() => {
              setButtonCLicked(true);
            }}
            className="w-[160px] h-[40px] rounded-full bg-black text-white font-semibold flex flex-row items-center justify-center mt-4"
          >
            {!buttonClicked && <div>{buttonText}</div>}
            {buttonClicked && (
              <img src="/spinner.svg" className="animate-spin size-5"></img>
            )}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-semibold">Or</h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!googleClicked && (
              <Link
                onClick={() => {
                  setGoogleClicked(true);
                }}
                href={"/login/google"}
                className="hover:bg-gray-200 rounded-full"
              >
                <Image
                  priority={true}
                  width={189}
                  height={40}
                  alt="googleSignin"
                  src="/googleSignin.svg"
                  className=""
                ></Image>
              </Link>
            )}
            {googleClicked && (
              <div className="bg-gray-200 px-[12px] py-[10px] border-[1px] border-gray-500 w-[189px] h-[40px] rounded-full flex flex-col items-center justify-center">
                <img
                  className="size-3 animate-spin "
                  src="/darkSpinner.svg"
                ></img>
              </div>
            )}
            {!githubClicked && (
              <Link
                onClick={() => {
                  setGithubClicked(true);
                }}
                href={"/login/github"}
                className="px-[12px] py-[10px] border-[1px] border-gray-500 w-[189px] h-[40px] rounded-full flex flex-row items-center justify-between hover:bg-gray-200"
              >
                <Image
                  priority={true}
                  width={20}
                  height={20}
                  alt="githubSignin"
                  src="/github.svg"
                ></Image>
                <h1 className="roboto-medium">Continue with GitHub</h1>
              </Link>
            )}
            {githubClicked && (
              <div className="bg-gray-200 px-[12px] py-[10px] border-[1px] border-gray-500 w-[189px] h-[40px] rounded-full flex flex-col items-center justify-center">
                <img
                  className="size-3 animate-spin "
                  src="/darkSpinner.svg"
                ></img>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
