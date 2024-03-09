import { prisma } from "@/lib/prisma";
import { Session, User } from "lucia";

export async function POST(req: Request, { params }: { params: { courseId: string } }): Promise<Response> {
    try {
        const courseId = parseInt(params.courseId);
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
        const purchasedCourses = userInDb.courses
        const courseAlreadyPurchased = purchasedCourses.find((t) => t.id === courseId);
        if (courseAlreadyPurchased) {
            return Response.json({ message: "already purchased the course" }, { status: 409 })
        }
        const updateUserCourses = await prisma.user.update({
            where: {
                id: session.userId
            },
            data: {
                courses: {
                    connect: {
                        id: courseId
                    }
                }
            },
            include: { //courses will be returned in the updateUserCourses object
                courses: true
            }
        });
        return Response.json({
            message: "course purchased successfully",
            yourCourses: updateUserCourses.courses
        }, { status: 200 })
    } catch (error) {
        console.error(error);
        return Response.json({ error: "internal server error" }, { status: 500 })
    }
}   