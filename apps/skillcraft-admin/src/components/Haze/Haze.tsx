"use client";

import { sideBarOpenState } from "state-store";
import { useRecoilState } from "recoil";

export const Haze = () => {
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);

  return (
    sideBarOpen && (
      <div className="z-20 fixed inset-0 bg-gradient-radial from-black/60 to-black/60 size-full"></div>
    )
  );
};
