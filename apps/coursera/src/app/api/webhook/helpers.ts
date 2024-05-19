import { prisma } from "@/lib/prisma";
import { courseFromDb } from "@/native-types/types";
import { apiResponse } from "helpers";
import { Session } from "lucia";
import { PrismaUserOutput } from "types";

export async function getUserCourses(userId: string): Promise<Response | courseFromDb[]> {
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

export async function updateUserCourses(userId: string, courseId: number): Promise<Response | PrismaUserOutput<{ include: { courses: true } }>> {
    const updateUserCourses = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            courses: {
                connect: {
                    id: courseId,
                },
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

export async function updateUserMultipleCourses(userId: string, courseIds: number[]): Promise<Response | PrismaUserOutput<{ include: { courses: true } }>> {

    var toConnect = []
    for (var i = 0; i < courseIds.length; i++) {
        toConnect.push({
            id: courseIds[i]
        })
    }

    const updateUserCourses = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            courses: {
                connect: toConnect
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

export async function buyCourse(session: Session, courseId: number) {
    if (!session) {
        console.log("Sign in first.")
    }

    const userId = session.userId;

    const updatedUser = await updateUserCourses(userId, courseId);
    if (updatedUser instanceof Response) {
        const response = updatedUser;
        return response;
    }
    //   console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    // return apiResponse({ message: "course purchased successfully", data: { courses: updatedUser.courses } }, 200)
    console.log("Course purchased successfully.")
}

export async function buyCourses(session: Session, courseIds: number[]) {
    if (!session) {
        console.log("Sign in first.")
    }

    const userId = session.userId;

    const updatedUser = await updateUserMultipleCourses(userId, courseIds);
    if (updatedUser instanceof Response) {
        const response = updatedUser;
        return response;
    }
    //   console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    // return apiResponse({ message: "course purchased successfully", data: { courses: updatedUser.courses } }, 200)
    console.log("Courses purchased successfully.")
}

export async function emptyCart(session: Session) {
    if (!session) {
        console.log("Sign in first.")
    }

    const userId = session.userId;
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            cart: []
        }
    })
    console.log("Cart emptied.")
}