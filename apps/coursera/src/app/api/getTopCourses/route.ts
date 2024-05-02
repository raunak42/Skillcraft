import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { apiResponse, handleApiError } from "helpers";
import { PrismaCourseOutput } from "types";

export async function GET(req: Request): Promise<Response> {
    try {

        // const cachedTopCourses: PrismaCourseOutput<{ select: {}, include: {} }>[] = JSON.parse(await redis.get("topCourses") as string)
        // if (cachedTopCourses) {
        //     return apiResponse({ data: { courses: cachedTopCourses } },200)
        // }
        const topCourses = await prisma.course.findMany({
            orderBy: {
                users: {
                    _count: 'desc',
                },
            },
            take: 10,
            include: {
                users: true,
                admin:true
            },
            distinct: "title"
        });

        await redis.set("topCourses", JSON.stringify(topCourses))

        return apiResponse({ data: { courses: topCourses } }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}