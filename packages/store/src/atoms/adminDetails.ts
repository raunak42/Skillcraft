import { atom } from "recoil";
import { PrismaAdminOutput } from "types";

export const adminDetailsState = atom<PrismaAdminOutput<{
    select: {}, include: {
        createdCourses: {
            include: { admin: true }
        }
    }
}> | null>({
    key: "adminDetailsState",
    default: null
});
