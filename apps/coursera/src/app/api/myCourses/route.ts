import { prisma } from "@/lib/prisma";
import { Session, User } from "lucia";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
    try {
        const sessionDataHeader = req.headers.get("session-data");
        if (!sessionDataHeader) {
            return Response.json({ message: "sessionDataHeader not found" }, { status: 400 })
        }
        const { session, user }: { session: Session, user: User } = JSON.parse(sessionDataHeader)
        const userInDb = await prisma.user.findUnique({
            where: {
                id: session.userId
            },
            include: {
                courses: true
            }
        });
        if (!userInDb) {
            return Response.json({ message: "user does not exist" }, { status: 404 })
        }
        const myCourses = userInDb.courses;
        return Response.json({ myCourses }, { status: 200 })
    } catch (error) {
        console.error(error);
        return Response.json({ error: "internal server error" }, { status: 500 })
    }
}