import { ADMIN_NOT_FOUND_MESSAGE, SESSION_HEADER_MISSING_MESSAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError } from "helpers";

export async function POST(req: Request): Promise<Response> {
    try {
        console.log("myCourses route")
        const sessionData = getSessionDataFromMiddleware(req)
        if (!sessionData) {
            return apiResponse({ message: SESSION_HEADER_MISSING_MESSAGE }, 401);//500 internal server error because middleware not working
        }
        const userId = sessionData.session.userId;

        const userinDb = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                courses: {
                    include: {
                        admin: true
                    }
                },
            }
        });
        if (!userinDb) {
            return apiResponse({ message: ADMIN_NOT_FOUND_MESSAGE }, 404)
        }
        const myCourses = userinDb.courses;
        return apiResponse({ data: { courses: myCourses } }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}