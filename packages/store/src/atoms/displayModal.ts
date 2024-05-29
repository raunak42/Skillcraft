import { atom } from "recoil";

export const displayModalState = atom<boolean>({
  key: "displayModalState",
  default: false,
});
    