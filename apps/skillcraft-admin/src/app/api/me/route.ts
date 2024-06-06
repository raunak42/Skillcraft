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

        const admin = await prisma.admin.findUnique({
            where: {
                id: adminId
            },
            select: {
                id: true,
                avatar: true,
                username: true,
                email: true,
                createdCourses: {
                    include: {
                        admin: true
                    }
                }
            },
        });

        if (!admin) {
            return apiResponse({ message: ADMIN_NOT_FOUND_MESSAGE }, 404)
        }
        return apiResponse({ data: { admin } }, 200)
    } catch (error) {
        return handleApiError(error)
    }


}