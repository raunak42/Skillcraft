import { prisma } from "@/lib/prisma";
import { getSessionDataFromMiddleware } from "helpers";
import { Session, User } from "lucia";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
    try {
        const sessionData = getSessionDataFromMiddleware(req)
        if (sessionData instanceof Response) {
            const response = sessionData;
            return response;
        }
        const { userId } = sessionData.session
        const userInDb = await prisma.user.findUnique({
            where: {
                id: userId
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