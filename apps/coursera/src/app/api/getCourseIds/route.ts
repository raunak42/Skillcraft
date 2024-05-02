import { prisma } from "@/lib/prisma";
import { apiResponse, handleApiError } from "helpers";
// import { allCourses, physicsCourses } from "./courses"

export async function GET(req: Request): Promise<Response> {
    // console.log(1)
    try {
        const courseIds = await prisma.course.findMany({
            select: {
                id: true
            }
        });

        const ids = courseIds.map((t)=>{
            return t.id
        })

        return apiResponse({ data: { courseIds: ids } }, 200);
    } catch (error) {
        return handleApiError(error)
    }
}

