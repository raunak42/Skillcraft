import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { apiResponse, handleApiError } from "helpers";
import { PrismaCourseOutput, featuredCourses } from "types";

export async function GET(req: Request): Promise<Response> {
    const categories = ['Computer Science', 'Physics', 'Art', 'Health', 'Music'];

    try {

        const cachedFeaturedCourses: featuredCourses[] = JSON.parse(await redis.get("featuredCourses") as string)
        if (cachedFeaturedCourses) {
            return apiResponse({ data: { featuredCourses: cachedFeaturedCourses } }, 200)
        }

        const promises = categories.map(async (category) => {
            const searchTerm = category.split(' ').map((word) => `${word}:*`).join(' & ');
            const unique = category.split(' ').toString();

            return await prisma.course.findMany({
                where: {
                    OR: [
                        { title: { search: searchTerm, mode: "insensitive" } },
                        { description: { search: searchTerm, mode: "insensitive" } },
                        { category: { hasSome: [category.toLowerCase(), unique.toLowerCase()] } },
                    ],
                },
                include:{
                    admin:true
                },
                take: 18,
                // distinct: "title",
            });
        });

        const coursesArrays = await Promise.all(promises);

        let featuredCourses = [];
        for (let i = 0; i < categories.length; i++) {
            featuredCourses.push({
                category: categories[i],
                courses: coursesArrays[i],
            });
        }

        await redis.set("featuredCourses", JSON.stringify(featuredCourses))

        return apiResponse({
            data: {
                featuredCourses: featuredCourses,
            },
        }, 200);
    } catch (error) {
        return handleApiError(error);
    }
}