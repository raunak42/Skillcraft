"use client";
interface SearchbarProps {}

function onHitEnter() {}

export const Searchbar: React.FC<SearchbarProps> = () => {
  return (
    <div className="border shadow-sm rounded-full w-[600px] flex items-center h-10 bg-gray-200">
      <div className="px-2">
        <img src="search.svg" className="size-6"></img>
      </div>
      <div className="px-1">
        <input
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onHitEnter();
            }
          }}
          placeholder="Search..."
          type="text"
          className="bg-inherit w-[540px] focus:outline-none"
        ></input>
      </div>
    </div>
  );
};
