import { courseFromDb } from "@/app/native-types/types";
import { getSessionDataFromMiddleware } from "@/app/utils/getSessionDataFromMiddleware";
import { validateBody } from "@/app/utils/validateBody";
import { prisma } from "@/lib/prisma";
import { CourseAttributes } from "types";
import { ZodError } from "zod";


export async function POST(req: Request): Promise<Response> {
    try {
        const sessionData = getSessionDataFromMiddleware(req);
        if (sessionData instanceof Response) {
            const response = sessionData
            return response;
        }
        const adminId = sessionData.session.userId
        const validatedCourse = await validateBody(req);

        const createdCourse = await createCourseInDb({ validatedCourse, adminId })
        if (createdCourse instanceof Response) {
            const response = createdCourse
            return response;
        }
        return Response.json({ message: "course created successfully", createdCourse }, { status: 200 })

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

const createCourseInDb = async ({ validatedCourse, adminId }: { validatedCourse: CourseAttributes, adminId: string }): Promise<Response | courseFromDb> => {
    const newCourse = await prisma.course.create({
        data: {
            ...validatedCourse,
            admin: {
                connect: {
                    id: adminId
                }
            },
        },
    });
    if (!newCourse) {
        return Response.json({ message: "couldn't create course, database didn't respond" })
    }

    return newCourse;
};