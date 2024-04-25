import Link from "next/link";

const Footer = () => {
  return (
    <div className=" w-full h-full bg-gray-300 flex flex-row py-10">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-4xl font-bold text-[#000000]">
          Find me on
        </h1>
        <div className="flex flex-row justify-center space-x-12 xl:space-x-32 pt-6">
          <a href="https://github.com/raunak42">
            <img src="github.svg" className="size-10 hover:cursor-pointer" />
          </a>
          <a href="https://twitter.com/raunak_42">
            <img src="twitter.svg" className="size-10 hover:cursor-pointer" />
          </a>
          <a href="mailto:raunaklanjewar42@gmail.com">
            <img src="gmail.svg" className="size-10 hover:cursor-pointer" />
          </a>
          <a href="https://www.reddit.com/user/RaunakA_/">
            <img src="reddit.svg" className="size-10 hover:cursor-pointer" />
          </a>
        </div>
        <div className="flex flex-col items-center mt-20 space-y-2">
          <Link href={"/ssrLanding"}>
            <img src="skillcraftLogo.svg" className="" width={200}></img>
          </Link>
          <div className="text-[#000000] font-semibold flex flex-col items-center ">
            <h1 className="">Copyright ©2024</h1>
            <div className="flex flex-row space-x-1 ">
              <h1>Created by</h1>
              <a href="https://github.com/raunak42">
                <h1 className="hover:cursor-pointer underline">Raunak42</h1>
              </a>
              <img src="github.svg" className="size-[18px]"></img>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full flex flex-row justify-end items-end">
      </div> */}
    </div>
  );
};

export default Footer;
