import { atom } from "recoil";

export const deleteConfirmationState = atom<boolean>({
  key: "deleteConfirmationState",
  default: false,
});
    