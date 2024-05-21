"use client";
import { BASE_URL_DEV } from "@/lib/constants";
import { Session, User } from "lucia";
import { useState } from "react";

interface ButtonsProps {
  session: Session | null;
  user: User | null;
  courseId: number;
}

export const Buttons: React.FC<ButtonsProps> = ({
  session,
  user,
  courseId,
}) => {
  const [cartClicked, setCartClicked] = useState<boolean>(false);
  const [wishClicked, setWishClicked] = useState<boolean>(false);

  const addToCart = async () => {
    if(!session){
        window.location.assign("/login")
    }
    setCartClicked(true);
    const res = await fetch(`${BASE_URL_DEV}/api/addToCart`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        data: {
          session,
          user,
        },
        courseIdToAdd: courseId,
      }),
      headers: {
        Origin: BASE_URL_DEV, ///Middleware demands the origin header. Need to send this origin header because this POST request is being made from a server component. Server deons't know the origin of the client.
      },
    });

    const response = await res.json();
    console.log(response);
  };

  const addToWishList = async () => {
    if(!session){
        window.location.assign("/login")
    }
    setWishClicked(true);
    const res = await fetch(`${BASE_URL_DEV}/api/addToWishlist`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        data: {
          session,
          user,
        },
        courseIdToAdd: courseId,
      }),
      headers: {
        Origin: BASE_URL_DEV, ///Middleware demands the origin header. Need to send this origin header because this POST request is being made from a server component. Server deons't know the origin of the client.
      },
    });

    const response = await res.json();
    console.log(response);
  };

  return (
    <div className="px-2 md:px-0 w-full flex flex-row items-center justify-between gap-2">
      <button
        onClick={addToWishList}
        className={` ${wishClicked && "bg-black/20"} rounded-full bg-black mt-4 px-6 py-2 lg:mt-6  text-sm lg:text-md font-semibold  text-white`}
      >
        Add to wishlist
      </button>
      <button
        onClick={addToCart}
        className={`${cartClicked && "bg-black/20 hover:cursor-default"} rounded-full bg-black mt-4 px-6 py-2 lg:mt-6  text-sm lg:text-md font-semibold  text-white`}
      >
        + Add to cart
      </button>
    </div>
  );
};
