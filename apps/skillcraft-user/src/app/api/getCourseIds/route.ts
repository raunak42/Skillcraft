import { prisma } from "@/lib/prisma";
import { apiResponse, handleApiError } from "helpers";

export async function GET(req: Request): Promise<Response> {
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

