import { ADMIN_NOT_FOUND_MESSAGE, COURSE_DELETE_SUCCESS_MESSAGE, PERMISSION_DENIED_MESSAGE, SESSION_HEADER_MISSING_MESSAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError } from "helpers";
import { PrismaAdminOutput } from "types";

export interface CourseIdParams {
    params: {
        courseId: string
    }
}

export async function DELETE(req: Request, { params }: CourseIdParams): Promise<Response> {
    try {
        const courseId = parseInt(params.courseId);
        const sessionData = getSessionDataFromMiddleware(req);
        if (!sessionData) {
            return apiResponse({ message: SESSION_HEADER_MISSING_MESSAGE }, 500);//500 internal server error because middleware not working
        }
        const adminId = sessionData.session.userId

        const adminInDb = await findAdminInDb(adminId)
        if (!adminInDb) {
            return apiResponse({ message: ADMIN_NOT_FOUND_MESSAGE }, 404)
        }
        const deleteCourse = await findAndDeleteCourse(adminInDb, courseId);
        if (!deleteCourse) {
            return apiResponse({ message: PERMISSION_DENIED_MESSAGE }, 403)
        }
        return apiResponse({ message: COURSE_DELETE_SUCCESS_MESSAGE}, 200)
    } catch (error) {
        return handleApiError(error)
    }
}

const findAdminInDb = async (adminId: string): Promise<PrismaAdminOutput<{ include: { createdCourses: true } }> | null> => {
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

const findAndDeleteCourse = async (adminInDb: Awaited<ReturnType<typeof findAdminInDb>>, courseId: number): Promise<Boolean> => {
    if (!adminInDb) {
        return false;
    }
    const { createdCourses } = adminInDb;
    if (!createdCourses) {
        return false;
    }
    const courseToDelete = createdCourses.find((t) => t.id === courseId);
    if (!courseToDelete) {
        return false;
    };
    await prisma.course.delete({
        where: {
            id: courseId
        }
    });
    return true;
}