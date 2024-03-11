import { prisma } from "@/lib/prisma"
import { Session, User } from "lucia"

export async function GET(req: Request): Promise<Response> {
    try {
        const sessionDataHeader = req.headers.get('session-data')
        if (!sessionDataHeader) {
            return Response.json({ message: "sessionDataHeader not found" }, { status: 400 })
        }
        const { session, user }: { session: Session, user: User } = JSON.parse(sessionDataHeader)
        const userId = session.userId
        const me = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                avatar: true,
                username: true,
                email: true,
                courses: true
            }
        });
        if (!me) {
            return Response.json({ message: "user doesn't exsit" }, { status: 404 })
        }
        return Response.json(me, { status: 200 })
    } catch (error) {
        console.error(error)
        return Response.json({ error: "internal server error" }, { status: 500 })
    }
}