import { ADMIN_NOT_FOUND_MESSAGE, REMOVED_FROM_WISHLIST_MESSAGE, SESSION_HEADER_MISSING_MESSAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError } from "helpers";

export async function POST(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const courseIdToRemove = body.courseIdToRemove
        // console.log(body)
        const sessionData = getSessionDataFromMiddleware(req)
        if (!sessionData) {
            return apiResponse({ message: SESSION_HEADER_MISSING_MESSAGE }, 401);//500 internal server error because middleware not working
        }
        const userId = sessionData.session.userId;

        const userinDb = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                // cart: true,
                courses: true,
                wishList: true
            }
        });

        const wishlist = userinDb?.wishList!
        const updatedWishlist = wishlist.filter(courseId => courseId !== courseIdToRemove);


        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                wishList: updatedWishlist
            }
        })
        console.log("Successfully removed.")

        if (!userinDb) {
            return apiResponse({ message: ADMIN_NOT_FOUND_MESSAGE }, 404)
        }
        const myCourses = userinDb.courses;
        return apiResponse({ message: REMOVED_FROM_WISHLIST_MESSAGE, data: { courseIds: updatedUser.wishList } }, 404)
    } catch (error) {
        return handleApiError(error)
    }
}