import { atom } from "recoil";
import { PrismaAdminOutput, PrismaUserOutput } from "types";

export const userDetailsState = atom<PrismaUserOutput<{
    select: {}, include: { courses: true }
}> | null>({
    key: "userDetailsState",
    default: null
});
