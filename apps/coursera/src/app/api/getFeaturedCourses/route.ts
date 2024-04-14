import { prisma } from "@/lib/prisma";
import { Prisma } from "db";
import { apiResponse, handleApiError } from "helpers";

export async function GET(req: Request): Promise<Response> {
    const categories = ['Computer Science','Physics', 'Art','Writing','Health', 'Music']
    try {
        //this will return 'n' courses arrays, where n = length of categories-array above.
        const promises = categories.map(async (category) => {
            const case1 = ` ${category} `
            const case2 = `${category},`
            const case3 = ` ${category}`
            const case4 = ` ${category},`

            return await prisma.course.findMany({
                where: {
                    OR: [
                        { title: { contains: case1, mode: "insensitive" } },
                        { title: { contains: case2, mode: "insensitive" } },
                        { title: { contains: case3, mode: "insensitive" } },
                        { title: { contains: case4, mode: "insensitive" } },
                        { description: { contains: case1, mode: "insensitive" } },
                        { description: { contains: case2, mode: "insensitive" } },
                        { description: { contains: case3, mode: "insensitive" } },
                        { description: { contains: case4, mode: "insensitive" } },
                        { category: { contains: case1, mode: "insensitive" } },
                        { category: { contains: case2, mode: "insensitive" } },
                        { category: { contains: case3, mode: "insensitive" } },
                        { category: { contains: case4, mode: "insensitive" } }
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

