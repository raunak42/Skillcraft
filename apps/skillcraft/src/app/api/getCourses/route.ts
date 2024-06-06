import { prisma } from "@/lib/prisma";
import { apiResponse, handleApiError } from "helpers";
// import { allCourses, physicsCourses } from "./courses"

export async function GET(req: Request): Promise<Response> {
    try {
        const courses = await prisma.course.findMany({
            // take:10
            include: { admin: true }
        });

        return apiResponse({ data: { courses } }, 200);
    } catch (error) {
        return handleApiError(error)
    }
}

