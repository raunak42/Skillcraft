import { prisma } from "@/lib/prisma";

//for ssr use
export async function GET(req: Request): Promise<Response> {
    try {
        const data = await prisma.course.findMany({
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
        return Response.json(data, { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response("internal server error", { status: 500 })
    }
}   