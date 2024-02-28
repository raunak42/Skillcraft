import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {
    const data = await prisma.course.findMany();

    return new Response("OK")
}