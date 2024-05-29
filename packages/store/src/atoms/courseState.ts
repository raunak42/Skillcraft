import { atom } from "recoil";
import { PrismaCourseOutput } from "types";

export const courseState = atom<PrismaCourseOutput<{ select: {}, include: {} }> | null>({
    key: "courseState",
    default: null,
});
