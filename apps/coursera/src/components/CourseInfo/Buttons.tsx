"use client";
import { BASE_URL_DEV } from "@/lib/constants";
import { Session, User } from "lucia";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Toaster, toast } from "sonner";
import { courseClickedState, userDetailsState } from "state-store";

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
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);

  const addToCart = async () => {
    if (!session) {
      window.location.assign("/login");
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
    if (!session) {
      window.location.assign("/login");
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

  const cart = userDetails?.cart;
  const wishlist = userDetails?.wishList;

  if (!userDetails) {
    return (
      <div className="flex flex-row items-center justify-center">
        <img src="/spinnerBlack.svg" className="animate-spin size-10"></img>
      </div>
    );
  }
  const courseInCart = cart!.find((id) => id === courseId);
  const courseInWishlist = wishlist!.find((id) => id === courseId);

  return (
    <div className="px-2 md:px-0 w-full flex flex-row items-center justify-between gap-2">
      <button
        onClick={() => {
          addToWishList();
          !courseInWishlist &&
            !wishClicked &&
            toast.success("Added to wishlist.");
          (courseInWishlist || wishClicked) &&
            toast.error("Already in wishlist.");
        }}
        className={` ${(courseInWishlist || wishClicked) && "bg-black/20"} rounded-full bg-black mt-4 px-6 py-2 lg:mt-6  text-xs lg:text-sm font-semibold  text-white`}
      >
        Add to wishlist
        <Toaster richColors />
      </button>
      <button
        onClick={() => {
          addToCart();
          !courseInCart && !cartClicked && toast.success("Added to cart.");
          (courseInCart || cartClicked) && toast.error("Already in cart.");
        }}
        className={`${(courseInCart || cartClicked) && "bg-black/20 hover:cursor-default"} rounded-full bg-black mt-4 px-6 py-2 lg:mt-6  text-xs lg:text-sm font-semibold  text-white`}
      >
        + Add to cart
        <Toaster />
      </button>
    </div>
  );
};
