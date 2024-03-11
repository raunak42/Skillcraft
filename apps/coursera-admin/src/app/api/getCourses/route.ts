import { prisma } from "@/lib/prisma";

//
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
        return Response.json(courses, { status: 200 })
    } catch (error) {
        console.error(error);
        return Response.json({ message: "internal server error" }, { status: 500 })
    }
}