import { Button } from "../Button/Button";
import { Searchbar } from "../Searchbar/Searchbar";
import Links from "./links/Links";

const NoSessionNavbar = () => {
  return (
    <div className="flex flex-row border border-b-red-600 shadow-sm p-2 items-center justify-between">
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
        <button className="border-none font-semibold text-[#EA3A36]">Categories</button>
        <button className=" rounded-lg bg-[#EA3A36] text-white font-bold w-32 py-2 ml-12 ">Login</button>
        <button className="rounded-lg py-2 w-32 ml-2 font-bold text-[#EA3A36] border border-[#EA3A36] bg-white">Signup</button>
      </div>
    </div>
  );
};

export default NoSessionNavbar;
