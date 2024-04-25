import { atom } from "recoil";

export const showDropDownState = atom<boolean>({
  key: "showDropDownState",
  default: false,
});
    