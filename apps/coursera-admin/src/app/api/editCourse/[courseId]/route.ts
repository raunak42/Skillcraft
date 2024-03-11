import { prisma } from "@/lib/prisma"
import { CourseAttributes } from "@/app/trial/page"

interface CourseIdParams {
    params: { courseId: string }
}

export async function PUT(req: Request, { params }: CourseIdParams): Promise<Response> {
    try {
        const courseId = parseInt(params.courseId)
        const sessionDataHeader = req.headers.get('session-data')
        if (!sessionDataHeader) {
            return Response.json({ message: "sessionDataHeader not found" }, { status: 500 })
        }

        const body = await req.json();
        const updatedCourse: CourseAttributes = body

        const updateCourseInDb = await prisma.course.update({
            where: { id: courseId },
            data: updatedCourse //rest of the data like admin and users will remains unchanged
        });
        if (!updateCourseInDb) {
            return Response.json({ message: "couldn't update the course, database didn't respond" }, { status: 500 })
        }

        return Response.json({ message: "course updated successfully", updateCourseInDb }, { status: 200 })
    } catch (error) {
        console.error(error)
        return Response.json({ message: "internal server error" }, { status: 500 })
    }

}   