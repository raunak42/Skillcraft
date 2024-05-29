import { prisma } from "@/lib/prisma";
import { PrismaAdminOutput, PrismaCourseInput } from "types";
import { apiResponse, getSessionDataFromMiddleware, handleApiError, validateCourseBody } from "helpers";
import {
    ADMIN_NOT_FOUND_MESSAGE,
    COURSE_UPDATE_SUCCESS_MESSAGE,
    PERMISSION_DENIED_MESSAGE, SESSION_HEADER_MISSING_MESSAGE
} from "@/lib/constants";
import { Session, User } from "lucia";

interface CourseIdParams {
    params: {
        courseId: string
    }
}

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

export async function PUT(req: Request, { params }: CourseIdParams): Promise<Response | undefined> {
    try {
        const body: BodyType = await req.json()
        const courseId = parseInt(params.courseId)
        const sessionData = getSessionDataFromMiddleware(req)
        if (!sessionData) {
            return apiResponse({ message: SESSION_HEADER_MISSING_MESSAGE }, 401);//500 internal server error because middleware not working
        }
        const adminId = sessionData.session.userId;

        const course = await validateCourseBody(body);
        const adminInDb = await findAdminInDb(adminId);
        if (!adminInDb) {
            return apiResponse({ message: ADMIN_NOT_FOUND_MESSAGE }, 404)
        }
        const updateCourse = await findAndUpdateCourse(adminInDb, courseId, course);
        if (!updateCourse) {
            return apiResponse({ message: PERMISSION_DENIED_MESSAGE }, 403)
        }

        return apiResponse({ message: COURSE_UPDATE_SUCCESS_MESSAGE }, 200)
    } catch (error) {
        handleApiError(error)
    }
}

const findAdminInDb = async (adminId: string): Promise<PrismaAdminOutput<
    {
        include: {
            createdCourses: true
        }
    }
> | null> => {
    const adminInDb = await prisma.admin.findUnique({
        where: {
            id: adminId
        },
        include: {
            createdCourses: true,
        }
    });
    if (!adminInDb) {
        return null
    }
    return adminInDb
}
const findAndUpdateCourse = async (
    adminInDb: NonNullable<Awaited<ReturnType<typeof findAdminInDb>>>,
    courseId: number,
    updatedCourse: PrismaCourseInput
): Promise<boolean> => {
    const { createdCourses } = adminInDb;
    if (!createdCourses) {
        return false;
    }
    const courseToUpdate = createdCourses.find((t) => t.id === courseId);
    if (!courseToUpdate) {
        return false;
    }
    await prisma.course.update({
        where: {
            id: courseId
        },
        data: updatedCourse
    })
    return true
}
