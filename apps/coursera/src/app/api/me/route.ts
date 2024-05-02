import { prisma } from "@/lib/prisma"
import { getSessionDataFromMiddleware } from "helpers";
import { Session, User } from "lucia"

export async function GET(req: Request): Promise<Response> {
    try {
        const sessionData = getSessionDataFromMiddleware(req);
        if (sessionData instanceof Response) {
            const response = sessionData;
            return response;
        }
        const  userId  = sessionData?.session.userId
        const me = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                avatar: true,
                username: true,
                email: true,
                courses: true
            }
        });
        if (!me) {
            return Response.json({ message: "user doesn't exsit" }, { status: 404 })
        }
        return Response.json(me, { status: 200 })
    } catch (error) {
        console.error(error)
        return Response.json({ error: "internal server error" }, { status: 500 })
    }
}