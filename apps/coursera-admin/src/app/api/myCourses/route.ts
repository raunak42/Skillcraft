import { prisma } from "@/lib/prisma";
import { getSessionDataFromMiddleware } from "helpers";

export async function GET(req: Request): Promise<Response> {
    try {
        const sessionData = getSessionDataFromMiddleware(req);
        if (sessionData instanceof Response) {
            const response = sessionData;
            return response;
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
            return Response.json({ message: "admin doesn't exist" }, { status: 404 })
        }
        const myCourses = admininDb.createdCourses;
        return Response.json(myCourses, { status: 200 })
    } catch (error) {
        console.error(error);
        return Response.json({ message: "internal server error" }, { status: 500 })
    }
}