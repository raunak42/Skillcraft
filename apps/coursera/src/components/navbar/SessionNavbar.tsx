import { Searchbar } from "../Searchbar/Searchbar";
import Links from "./links/Links";

const SessionNavbar = () => {
  return (
    <div className="flex flex-row border shadow-sm p-4 items-center">
        Avatar and stuff
      <img src="hamburger.svg" className="size-6"></img>
      <img
        className="w-64"
        src="skillcraft-high-resolution-logo-transparent.png"
      ></img>
      <Searchbar/>
      {/* <Links /> */}
    </div>
  );
};

export default SessionNavbar;
