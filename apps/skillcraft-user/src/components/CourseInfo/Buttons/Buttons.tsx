"use client";
import { Toaster, toast } from "sonner";

export const Buttons: React.FC = () => {

  return (
    <div>
      <div className=" px-2 md:px-0 w-full flex flex-row items-center justify-between gap-2">
        <button
          onClick={() => {
            toast.error("Login first.")
          }}
          className={`font-thin bg-black   rounded-full  mt-4 px-6 py-2 lg:mt-6  text-xs lg:text-sm  text-white`}
        >
          Add to wishlist
          <Toaster richColors />
        </button>
        <button
          onClick={() => {
            toast.error("Login first.")
          }}
          className={`font-thin bg-black rounded-full mt-4 px-6 py-2 lg:mt-6  text-xs lg:text-sm  text-white`}
        >
          + Add to cart
          <Toaster />
        </button>
      </div>
    </div>
  );
};
