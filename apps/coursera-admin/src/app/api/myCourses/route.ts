import { prisma } from "@/lib/prisma";
import { SessionAttributes } from "types";

export async function GET(req: Request): Promise<Response> {
    try {
        const sessionDataHeader = req.headers.get('session-data');
        if (!sessionDataHeader) {
            return Response.json({ message: "sessionDataHeader not found" }, { status: 500 })
        };
        const { session, user }: SessionAttributes = JSON.parse(sessionDataHeader);
        const adminId = session.userId;

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