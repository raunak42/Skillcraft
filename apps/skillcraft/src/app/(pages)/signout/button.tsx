"use client";

import { useState } from "react";

export const Button = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <button
      onClick={() => {
        setIsLoading(true);
      }}
      className="p-4 mb-[400px] w-[120px] h-[40px] flex items-center justify-center bg-black rounded-full text-white font-semibold"
    >
      {!isLoading&&<h1>Sign out</h1>}
      {isLoading&&<img src="/spinner.svg" className="size-6 animate-spin" ></img>}
    </button>
  );
};
