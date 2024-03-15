import { getSessionDataFromMiddleware } from "@/app/utils/getSessionDataFromMiddleware";
import { prisma } from "@/lib/prisma";
import { CourseAttributes } from "types";
import { ZodError } from "zod";
import { courseInput } from "zod-validation";

interface createCourseReturnType extends CourseAttributes {
    adminId: string | null
    id: number
}

export async function POST(req: Request): Promise<Response> {
    try {
        const sessionData = getSessionDataFromMiddleware(req);
        if (sessionData instanceof Response) {
            return sessionData;
        }
        const adminId = sessionData.session.userId
        const validatedCourse = await validateBody(req)

        const newCourse = await createCourse({ validatedCourse, adminId })
        if (newCourse instanceof Response) {
            return newCourse;
        }
        return Response.json({ message: "course created successfully", newCourse }, { status: 200 })

    } catch (error) {
        console.error(error);
        if (error instanceof ZodError) {
            const errorMessage = error.issues.map((t) => { return `${t.message} at ${t.path}` })
            return Response.json(errorMessage, { status: 400 })

        }
        return Response.json({ error }, { status: 500 })
    }
}

async function validateBody(req: Request): Promise<CourseAttributes> {
    const body = await req.json();//giving it a type is important or else the prisma call below won't recognize the data while using a spred operator.
    const course: CourseAttributes = body;
    const validatedCourse = courseInput.parse(course);

    return validatedCourse;
}

const createCourse = async ({ validatedCourse, adminId }: { validatedCourse: CourseAttributes, adminId: string }): Promise<Response | createCourseReturnType> => {
    const newCourse = await prisma.course.create({
        data: {
            ...validatedCourse,
            admin: {
                connect: {
                    id: adminId
                }
            }
        },
    });
    if (!newCourse) {
        return Response.json({ message: "couldn't create course, database didn't respond" })
    }

    return newCourse;
};