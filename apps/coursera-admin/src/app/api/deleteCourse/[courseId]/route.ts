import { prisma } from "@/lib/prisma";
import {
    CourseIdParams,
    SessionAttributes
} from "types";

export async function DELETE(req: Request, { params }: CourseIdParams): Promise<Response> {
    try {
        const courseId = parseInt(params.courseId);
        const sessionDataHeader = req.headers.get('session-data');
        if (!sessionDataHeader) {
            return Response.json({ message: "sessionDataHeader not found" }, { status: 500 })
        }

        const { session, user }: SessionAttributes = JSON.parse(sessionDataHeader);
        const adminId = session.userId

        const adminInDb = await prisma.admin.findUnique({
            where: {
                id: adminId
            },
            include: {
                createdCourses: true
            }
        });
        if (!adminInDb) {
            return Response.json({ message: "admin doesn't exist" }, { status: 400 })
        }
        const { createdCourses } = adminInDb;
        const courseToDelete = createdCourses.find((t) => t.id === courseId);
        if (!courseToDelete) {
            return Response.json({ message: "you are not the admin of this course" }, { status: 403 })
        };
        const deleteCourse = await prisma.course.delete({
            where: {
                id: courseId
            }
        });
        console.log(deleteCourse, "hithere")
        if (!deleteCourse) {
            return Response.json({ message: "failed to delete the course, databse didn't respond" }, { status: 500 })
        }

        return Response.json({ message: "successfully deleted the course" }, { status: 200 })
    } catch (error) {
        console.error(error);
        return Response.json({ message: "internal server error" }, { status: 500 })
    }
}