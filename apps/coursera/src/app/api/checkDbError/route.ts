import { ADMIN_NOT_FOUND_MESSAGE, DB_CONNCT_SCCS, SESSION_HEADER_MISSING_MESSAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError } from "helpers";

export async function GET(req: Request): Promise<Response> {
    try {
        await prisma.admin.findMany()
        return apiResponse({ message: DB_CONNCT_SCCS }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}