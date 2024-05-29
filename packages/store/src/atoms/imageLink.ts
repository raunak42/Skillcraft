import { atom } from "recoil";

export const imageLinkState = atom<string>({
    key: "imageLinkState",
    default: "",
});
