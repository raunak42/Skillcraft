import { validateRequest } from "@/auth";
import { middleware } from "@/middleware";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { courseId: string } }) {
    const courseId = parseInt(params.courseId);
    const sessionDataHeader = req.headers.get("session-data") as string;
    const { session, user } = JSON.parse(sessionDataHeader)
    if (session) {
        console.log(session)
        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: session.userId
            },
            include: {
                courses: {}
            }
        });

        if (loggedInUser) {
            const purchasedCourses = loggedInUser.courses
            const alreadyPurchasedCourse = purchasedCourses.find((t) => t.id === courseId);
            if (alreadyPurchasedCourse) {
                return Response.json({ alreadyPurchasedCourse }, { status: 200 })
            }
            const courses = purchasedCourses
            return Response.json({ courses });

        }
    }
    return Response.json({ session })
}   