import { ADMIN_NOT_FOUND_MESSAGE, SESSION_HEADER_MISSING_MESSAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError } from "helpers";

export async function POST(req: Request): Promise<Response> {
    try {
        const sessionData = getSessionDataFromMiddleware(req)
        if (!sessionData) {
            return apiResponse({ message: SESSION_HEADER_MISSING_MESSAGE }, 401);//500 internal server error because middleware not working
        }
        const adminId = sessionData.session.userId;

        const admininDb = await prisma.admin.findUnique({
            where: {
                id: adminId
            },
            include: {
                createdCourses: true
            }
        });
        if (!admininDb) {
            return apiResponse({ message: ADMIN_NOT_FOUND_MESSAGE}, 404)
        }
        const myCourses = admininDb.createdCourses;
        return apiResponse({ data: { courses: myCourses } }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}