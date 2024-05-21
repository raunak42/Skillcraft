import { prisma } from "@/lib/prisma"
import { apiResponse, getSessionDataFromMiddleware } from "helpers";
import { Session, User } from "lucia"

export async function POST(req: Request): Promise<Response> {
    try {
        const sessionData = getSessionDataFromMiddleware(req);
        if (sessionData instanceof Response) {
            const response = sessionData;
            return response;
        }

        const userId = sessionData?.session.userId
        const user = await prisma.user.findUnique({
            select: {
                id: true,
                avatar: true,
                username: true,
                email: true,
                courses: true,
                cart: true,
                wishList:true
            },
            where: {
                id: userId
            }
        });
        if (!user) {
            return apiResponse({ message: "user doesn't exsit" }, 404)
        }
        return apiResponse({ data: { user } }, 200)
    } catch (error) {
        console.error(error)
        return apiResponse({ error: "internal server error" }, 500)
    }
}