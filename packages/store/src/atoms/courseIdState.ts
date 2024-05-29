import { atom } from "recoil";

export const courseIdState = atom<number | null>({
    key: "courseIdState",
    default: null,
});
