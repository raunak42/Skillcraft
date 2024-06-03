"use client";

import { useState } from "react";

export const TryAgainButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <button
      onClick={() => {
        setLoading(true);
        window.location.reload();
      }}
      className="border-[1.5px] hover:shadow-xl border-black rounded-full text-base font-thin text-black w-[100px] h-[34px]"
    >
      {loading ? <Spinner /> : "Try again."}
    </button>
  );
};

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center" >
      <img src="/spinnerBlack.svg" className="size-5 animate-spin"></img>
    </div>
  );
};
