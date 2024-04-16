import { Searchbar } from "../Searchbar/Searchbar";

const NoSessionNavbar = () => {
  return (
    <div className=" flex-row border border-b-2 shadow-sm p-2 items-center justify-between ">
      <div className="flex flex-row justify-between px-2">
        <img
          className="size-8 hover:cursor-pointer"
          src="hamburger.svg"
        ></img>
        <img
          className="w-[150px] ml-8 hover:cursor-pointer"
          src="skillcraftLogo.svg"
        ></img>
        <div className="ml-8 hidden">
          <Searchbar />
        </div>
        <div className="ml-8">
          <img src="search.svg" className="size-6"></img>
        </div>
      </div>
      <div className=" flex-row justify-start hidden">
        <button className="border-none font-semibold text-black">
          Categories
        </button>
        <button className=" rounded-lg bg-black text-white font-bold w-32 py-2 ml-12 ">
          Login
        </button>
        <button className="rounded-lg py-2 w-32 ml-2 font-bold text-black border-[1.5px] border-black bg-white">
          Signup
        </button>
      </div>
    </div>
  );
};

export default NoSessionNavbar;
