import { ADMIN_NOT_FOUND_MESSAGE, SESSION_HEADER_MISSING_MESSAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError } from "helpers";

export async function POST(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const courseIdToRemove = body.courseIdToRemove
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
                cart: true,
                courses: true,
            }
        });

        const cart = userinDb?.cart!
        const updatedCart = cart.filter(courseId => courseId !== courseIdToRemove);


        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                cart: updatedCart
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