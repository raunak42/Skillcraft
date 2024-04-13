import { prisma } from "@/lib/prisma";
import { apiResponse, handleApiError } from "helpers";

export async function GET(req: Request): Promise<Response> {
    const categories = ['Physics', 'Computer Science', 'Art', 'Health', 'Finance', 'Psychology', 'Writing', 'History']

    try {
        //this will return 'n' courses arrays, where n = length of categories-array above.
        const promises = categories.map(async (category) => {
            return await prisma.course.findMany({
                where: {
                    OR: [
                        { title: { contains: category, mode: "insensitive" } },
                        { description: { contains: category, mode: "insensitive" } },
                        { category: { contains: category, mode: "insensitive" } },
                    ],
                },
                take: 18,
            });
        });

        const coursesArrays = await Promise.all(promises);

        let featuredCourses = [];
        for (let i = 0; i < categories.length; i++) {
            featuredCourses.push({
                category: categories[i],
                courses: coursesArrays[i]
            })
        };

        return apiResponse({
            data: {
                featuredCourses: featuredCourses
            }
        }, 200);
    } catch (error) {
        return handleApiError(error)
    }
}

