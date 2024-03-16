import { prisma } from "@/lib/prisma";
import { courseFromDb } from "@/native-types/types";
import { getSessionDataFromMiddleware } from "helpers";

type UserAttributes = {
    username: string;
    id: string;
    email: string | null;
    avatar: string | null;
    hashed_password: string;
};

type coursesFromDbWithUserInfo = {
    courses: courseFromDb[]
} & UserAttributes

export async function POST(req: Request, { params }: { params: { courseId: string } }): Promise<Response> {
    try {
        const courseId = parseInt(params.courseId);
        const sessionData = getSessionDataFromMiddleware(req);
        if (sessionData instanceof Response) {
            const response = sessionData;
            return response;
        }

        const { userId } = sessionData.session

        const purchasedCourses = await getUserCourses(userId);
        if (purchasedCourses instanceof Response) {
            const response = purchasedCourses;
            return response;
        }
        const courseAlreadyPurchased = purchasedCourses.find((t) => t.id === courseId);
        if (courseAlreadyPurchased) {
            return Response.json({ message: "already purchased the course" }, { status: 409 })
        }

        const updatedCourses = await updateUserCourses(userId, courseId);
        if (updatedCourses instanceof Response) {
            const response = updatedCourses;
            return response;
        }

        return Response.json({
            message: "course purchased successfully",
            yourCourses: updatedCourses
        }, { status: 200 })
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return Response.json(error.message, { status: 500 })
        }
        return Response.json({ error: "internal server error" }, { status: 500 })
    }
}

async function getUserCourses(userId: string): Promise<Response | courseFromDb[]> {
    const userInDb = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            courses: true
        }
    });
    if (!userInDb) {
        return Response.json({ message: "user does not exist" }, { status: 404 })
    }
    const purchasedCourses = userInDb.courses;
    return purchasedCourses;
}

async function updateUserCourses(userId: string, courseId: number): Promise<Response | coursesFromDbWithUserInfo> {
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
        return new Response("An error occured. Couldn't reach the databse.")
    }

    return updateUserCourses;
}