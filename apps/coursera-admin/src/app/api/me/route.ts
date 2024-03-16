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

        const admin = await prisma.admin.findUnique({
            where: {
                id: adminId
            },
            select: {
                id: true,
                avatar: true,
                adminname: true,
                email: true,
                createdCourses: true
            }
        });
        if (!admin) {
            return Response.json({ message: "admin doesn't exist" }, { status: 404 })
        }
        return Response.json(admin)
    } catch (error) {
        console.error(error);
        return Response.json({ message: "internal server error" }, { status: 500 })
    }


}