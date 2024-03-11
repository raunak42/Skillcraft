import { prisma } from "@/lib/prisma";
import { SessionAttributes } from "../createCourse/route";

export async function GET(req: Request): Promise<Response> {
    try {
        const sessionDataHeader = req.headers.get('session-data');
        if (!sessionDataHeader) {
            return Response.json({ message: "sessionDataHeader not found" }, { status: 500 })
        };
        const { session, user }: SessionAttributes = JSON.parse(sessionDataHeader);
        const adminId = session.userId;

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