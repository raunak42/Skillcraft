"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { courseClickedState } from "state-store";

interface SearchbarProps {}

export const Searchbar: React.FC<SearchbarProps> = () => {
  const [query, setQuery] = useState<string>("");
  const [searchHit, setSearchHit] = useRecoilState(courseClickedState)
  const firstPage = 1
  const searchParams = useSearchParams();
  const persistingText = searchParams.get("q");
  useEffect(() => {
    setQuery(persistingText as string);
  }, []);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchHit(true)
      if (query.trim().length !== 0 && query !== null && query !== "") {
        window.location.assign(
          `/search?q=${encodeURIComponent(query)}&p=${firstPage}`
        );
      }
    }
  };

  const handleCLick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSearchHit(true)
    if (query.trim().length !== 0 && query !== null && query !== "") {
      window.location.assign(
        `/search?q=${encodeURIComponent(query)}&p=${firstPage}`
      );
    }
  };

  return (
    <div className="border-[1.5px] border-black shadow-sm rounded-full w-full lg:w-[90%] flex items-center h-10 bg-gray-100 pl-4 flex-row gap-3 ">
      <img src="/search.svg" className="size-5 "></img>
      <input
        // autoFocus={true}
        defaultValue={query as string}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        onKeyDown={handleSearch}
        onFocus={(event) => {
          setQuery(event.currentTarget.value);
        }}
        placeholder="Search..."
        type="text"
        className="bg-inherit focus:outline-none w-full"
      ></input>
      <button
        onClick={handleCLick}
        className="bg-gray-300 hover:bg-gray-200/95 h-full w-[30%] xl:w-[20%] rounded-r-full flex flex-row items-center justify-center"
      >
        <img src="/search.svg" className="size-6 "></img>
      </button>
    </div>
  );
};
