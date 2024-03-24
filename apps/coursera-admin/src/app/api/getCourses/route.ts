import { prisma } from "@/lib/prisma";
import { apiResponse, handleApiError } from "helpers";

export async function GET(req: Request): Promise<Response> {
    try {
        const courses = await prisma.course.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                imageLink: true,
                price: true,
                published: true,
                adminId: false
            }
        });
        return apiResponse({ data: { courses } }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}