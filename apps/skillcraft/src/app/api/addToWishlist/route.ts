import { ADMIN_NOT_FOUND_MESSAGE, SESSION_HEADER_MISSING_MESSAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError } from "helpers";

export async function POST(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const courseIdToAdd: number = body.courseIdToAdd

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
                wishList:true
            }
        });

        const wishList = userinDb?.wishList!
        // const updatedCart = wishList.filter(courseId => courseId !== courseIdToRemove);
        const alreadyInWishlist = wishList.find((id) => id === courseIdToAdd)


        if(alreadyInWishlist){
            return apiResponse({message:"Already in wishlist."})
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                wishList: {
                    push: courseIdToAdd
                }
            }
        })

        if (!userinDb) {
            return apiResponse({ message: ADMIN_NOT_FOUND_MESSAGE }, 404)
        }
        const myCourses = userinDb.courses;
        return apiResponse({ data: { courses: myCourses } }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}