import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//for ssr use
export async function GET(req: NextRequest) {

    const data = await prisma.course.findMany({
        include: {
            admin: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            },
            users: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    });
    return new Response(JSON.stringify(data))
}   