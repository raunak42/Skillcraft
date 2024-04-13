import { prisma } from "@/lib/prisma";
import { apiResponse, handleApiError } from "helpers";

export async function GET(req:Request):Promise<Response> {
    try {
        const topCourses = await prisma.course.findMany({
            orderBy: {
                users: {
                    _count: 'desc',
                },
            },
            take: 10,
            include: {
                users: true,
            },
            distinct:"title"
        });

        return apiResponse({ data: { courses: topCourses } }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}