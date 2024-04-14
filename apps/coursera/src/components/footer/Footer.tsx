const Footer = () => {
  return (
    <div className=" w-full h-[300px] mt-auto border bg-red-50 flex flex-row">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-4xl font-bold text-[#EA3A36] mt-2">
          Find me on:
        </h1>
        <div className="flex flex-row justify-center space-x-24 pt-6">
          <img src="github.svg" className="size-10 hover:cursor-pointer" />
          <img src="twitter.svg" className="size-10 hover:cursor-pointer" />
          <img src="gmail.svg" className="size-10 hover:cursor-pointer" />
          <img src="reddit.svg" className="size-10 hover:cursor-pointer" />
        </div>
        <div className="flex flex-col items-center mt-20 space-y-2">
          <img src="skillcraftLogo.svg" className="" width={200}></img>
          <div className="text-[#EA3A36] font-semibold flex flex-col items-center ">
            <h1 className="">Copyright ©2024</h1>
            <div className="flex flex-row space-x-1 ">
              <h1>Created by</h1>
              <h1 className="hover:cursor-pointer underline">Raunak42</h1>
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
