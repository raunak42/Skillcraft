import { getSessionDataFromMiddleware } from "@/app/utils/getSessionDataFromMiddleware";
import { prisma } from "@/lib/prisma"
import { CourseIdParams, CourseAttributes } from "types"
import { courseInput } from "zod-validation"
import { ZodError } from "zod";
import { courseFromDb } from "@/app/native-types/types";
import { validateBody } from "@/app/utils/validateBody";

export async function PUT(req: Request, { params }: CourseIdParams): Promise<Response> {
    try {
        const courseId = parseInt(params.courseId)
        const sessionData = getSessionDataFromMiddleware(req)
        if (sessionData instanceof Response) {
            const response = sessionData
            return response;
        }
        const adminId = sessionData.session.userId;

        const createdCourses = await getAdminCoursesFromDb(adminId);
        if (createdCourses instanceof Response) {
            const response = createdCourses
            return response;
        }

        const isCourseCreatedByAdmin = courseBelongsToAdmin(createdCourses, courseId);
        if (isCourseCreatedByAdmin === false) {
            return Response.json({ message: "you are not the admin of this course" }, { status: 403 })
        }

        const validatedCourse = await validateBody(req);
        const updateCourseResponse = await updateCourseInDb({ courseId, validatedCourse });
        if (updateCourseResponse instanceof Response) {
            const response = updateCourseResponse
            return response;
        }

        return Response.json({ message: "course updated successfully", updateCourseResponse }, { status: 200 })

    } catch (error) {
        console.error(error);
        if (error instanceof ZodError) {
            const errorMessage = error.issues.map((t) => { return `${t.message} at ${t.path}` })
            return Response.json(errorMessage, { status: 400 })

        }
        if (error instanceof Error) { //one of the triggers of this if statement is when the client doesn't send a body
            return Response.json(error.message, { status: 500 })
        }
        return Response.json(error, { status: 500 })
    }
}

const getAdminCoursesFromDb = async (adminId: string): Promise<Response | courseFromDb[]> => {
    const adminInDb = await prisma.admin.findUnique({
        where: {
            id: adminId
        },
        include: {
            createdCourses: true
        }

    });
    if (!adminInDb) {
        return Response.json({ message: "admin doesn't exist" }, { status: 404 })
    }
    const { createdCourses } = adminInDb;
    return createdCourses;
};

const updateCourseInDb = async ({ courseId, validatedCourse }: { courseId: number, validatedCourse: CourseAttributes }): Promise<Response | courseFromDb> => {
    const updateCourseInDb = await prisma.course.update({
        where: { id: courseId },
        data: validatedCourse //rest of the data like admin and users will remains unchanged
    });
    if (!updateCourseInDb) {
        return Response.json({ message: "couldn't update the course, database didn't respond" }, { status: 500 })
    }
    return updateCourseInDb
}

const courseBelongsToAdmin = (createdCourses: courseFromDb[], courseId: number) => {
    const courseToUpdate = createdCourses.find((t) => t.id === courseId);
    if (!courseToUpdate) {
        return false
    }
    return true;
}