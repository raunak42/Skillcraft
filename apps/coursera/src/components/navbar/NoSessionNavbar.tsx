import { Button } from "../Button/Button";
import { Searchbar } from "../Searchbar/Searchbar";
import Links from "./links/Links";

const NoSessionNavbar = () => {
  return (
    <div className="flex flex-row border-[2px] border-b-[#ED2647] shadow-sm p-2 items-center justify-between">
      <div className="flex flex-row items-center">
        <img
          className="w-64 ml-8"
          src="skillcraftLogo.svg"
        ></img>
        <div className="ml-8">
          <Searchbar />
        </div>
      </div>
      <div className="flex flex-row justify-start">
        <button className="border-none font-semibold text-[#ED2647]">Categories</button>
        <button className=" rounded-lg bg-[#ED2647] text-white font-bold w-32 py-2 ml-12 ">Login</button>
        <button className="rounded-lg py-2 w-32 ml-2 font-bold text-[#ED2647] border border-[#ED2647] bg-white">Signup</button>
      </div>
    </div>
  );
};

export default NoSessionNavbar;
