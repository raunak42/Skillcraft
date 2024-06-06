import { COURSE_CREATE_SUCCESS_MESSAGE, SESSION_HEADER_MISSING_MESSAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError, validateCourseBody } from "helpers";
import { PrismaCourseInput } from "types";
import { Session, User } from "lucia"

interface BodyType {
    title: string;
    description: string;
    imageLink: string;
    price: string; //will be received as a string from the client
    published: boolean;
    data: {
        session: Session | null;
        user: User | null
    }
}

export async function POST(req: Request): Promise<Response> {
    try {
        const body: BodyType = await req.json()
        const sessionData = getSessionDataFromMiddleware(req);
        if (!sessionData) {
            return apiResponse({ message: SESSION_HEADER_MISSING_MESSAGE }, 500);//500 internal server error because middleware not working
        }
        const adminId = sessionData.session.userId
        const course = await validateCourseBody(body);
        await createCourseInDb({ course, adminId })

        return apiResponse({ message: COURSE_CREATE_SUCCESS_MESSAGE }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}

const createCourseInDb = async (
    { course, adminId }: { course: PrismaCourseInput, adminId: string }
):
    Promise<PrismaCourseInput> => {
    const newCourse = await prisma.course.create({
        data: {
            ...course,
            admin: {
                connect: {
                    id: adminId
                }
            },
        },
    });
    return newCourse;
};