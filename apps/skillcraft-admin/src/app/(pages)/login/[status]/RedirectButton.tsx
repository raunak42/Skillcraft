"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const RedirectButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="flex flex-col items-center text-center justify-start gap-4 mb-[320px]">
      <h1 className="text-2xl font-semibold">You are already logged in.</h1>
      <button
        onClick={() => {
          setLoading(true);
          router.push("/create");
        }}
        className=" w-[200px] h-[40px] rounded-full bg-black "
      >
        {!loading && (
          <div className="flex flex-row items-center justify-center gap-2">
            <img src="/arrowLeft.svg" className="size-5"></img>
            <h1 className="text-white font-semibold text-sm">Go to homepage</h1>
          </div>
        )}
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <img src="/spinner.svg" className="size-4 animate-spin"></img>
          </div>
        )}
      </button>
    </div>
  );
};
