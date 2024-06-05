import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError } from "helpers";
import { Session, User } from "lucia";
import { NextResponse } from "next/server";
import { PrismaCourseOutput, PrismaUserOutput } from "types";

export async function POST(req: Request, { params }: { params: { courseId: string } }): Promise<Response> {
    try {
        console.log("buyCourse Reached")
        const body = await req.json()
        console.log("BODY", body)
        const { session, user }: { session: Session | null, user: User | null } = body;

        if (!session) {
            return NextResponse.json({ message: "Sign in first." }, {
                status: 403
            })
        }

        const courseId = parseInt(params.courseId);
        const sessionData = getSessionDataFromMiddleware(req);
        if (sessionData instanceof Response) {
            const response = sessionData;
            return response;
        }
        if (!sessionData) {
            return apiResponse()
        }

        const { userId } = sessionData.session

        const purchasedCourses = await getUserCourses(userId);
        if (purchasedCourses instanceof Response) {
            const response = purchasedCourses;
            return response;
        }
        const courseAlreadyPurchased = purchasedCourses.find((t) => t.id === courseId);
        if (courseAlreadyPurchased) {
            return apiResponse({ message: "already purchased the course" }, 409)
        }

        const updatedUser = await updateUserCourses(userId, courseId);
        if (updatedUser instanceof Response) {
            const response = updatedUser;
            return response;
        }

        return apiResponse({ message: "course purchased successfully", data: { courses: updatedUser.courses } }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}

async function getUserCourses(userId: string): Promise<Response | PrismaCourseOutput<{ select: {}, include: {} }>[]> {
    const userInDb = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            courses: true
        }
    });
    if (!userInDb) {
        return apiResponse({ message: "user does not exist" }, 404)
    }
    const purchasedCourses = userInDb.courses;
    return purchasedCourses;
}

async function updateUserCourses(userId: string, courseId: number): Promise<Response | PrismaUserOutput<{ include: { courses: true } }>> {
    const updateUserCourses = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            courses: {
                connect: {
                    id: courseId
                }
            }
        },
        include: {
            courses: true
        }
    });
    if (!updateUserCourses) {
        return apiResponse({ message: "An error occured. Couldn't reach the databse." })
    }

    return updateUserCourses;
}