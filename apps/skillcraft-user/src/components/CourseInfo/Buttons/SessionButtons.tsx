"use client";
import { BASE_URL } from "@/lib/constants";
import { Session, User } from "lucia";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Toaster, toast } from "sonner";
import { userDetailsState } from "state-store";
import { PrismaUserOutput } from "types";

interface SessionButtonsProps {
  user: User | null;
  courseId: number;
  session: Session | null;
}

export const SessionButtons: React.FC<SessionButtonsProps> = ({
  user,
  courseId,
  session,
}) => {
  const [cartClicked, setCartClicked] = useState<boolean>(false);
  const [wishClicked, setWishClicked] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const [userInfo, setUserInfo] = useState<PrismaUserOutput<{
    select: {};
    include: { courses: true };
  }> | null>(null);

  useEffect(() => {
    setUserInfo(userDetails);
  }, [userDetails, userDetailsState]);

  const addToCart = async () => {
    const res = await fetch(`${BASE_URL}/api/addToCart`, {
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
        Origin: BASE_URL, ///Middleware demands the origin header. Need to send this origin header because this POST request is being made from a server component. Server deons't know the origin of the client.
      },
    });
  };

  const addToWishList = async () => {
    const res = await fetch(`${BASE_URL}/api/addToWishlist`, {
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
        Origin: BASE_URL, ///Middleware demands the origin header. Need to send this origin header because this POST request is being made from a server component. Server deons't know the origin of the client.
      },
    });
  };

  const cart = userDetails?.cart;
  const wishlist = userDetails?.wishList;

  if (!userInfo) {
    return (
      <div className="flex flex-row items-center justify-center">
        <img src="/spinnerBlack.svg" className="animate-spin size-10"></img>
      </div>
    );
  }

  const courseInCart = cart?.find((id) => id === courseId);
  const courseInWishlist = wishlist?.find((id) => id === courseId);

  return (
    <div className="" >
      <div className=" px-2 md:px-0 w-full flex flex-row items-center justify-between gap-2">
        <button
          onClick={() => {
            setWishClicked(true);
            !courseInWishlist && addToWishList();
            !courseInWishlist &&
              !wishClicked &&
              toast.success("Added to wishlist.");
            (courseInWishlist || wishClicked) &&
              toast.error("Already in wishlist.");
          }}
          className={`font-thin ${wishClicked || courseInWishlist ? "bg-black/20 hover:cursor-default" : "bg-black"}   rounded-full  mt-4 px-6 py-2 lg:mt-6  text-xs lg:text-sm font-semibold  text-white`}
        >
          Add to wishlist
          <Toaster richColors />
        </button>
        <button
          onClick={() => {
            setCartClicked(true);
            !courseInCart && addToCart();
            !courseInCart && !cartClicked && toast.success("Added to cart.");
            (courseInCart || cartClicked) && toast.error("Already in cart.");
          }}
          className={`font-thin ${cartClicked || courseInCart ? "bg-black/20 hover:cursor-default" : "bg-black"} rounded-full mt-4 px-6 py-2 lg:mt-6  text-xs lg:text-sm font-semibold  text-white`}
        >
          + Add to cart
          <Toaster />
        </button>
      </div>
    </div>
  );
};
