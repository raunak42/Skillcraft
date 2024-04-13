import { prisma } from "@/lib/prisma";
import { SIGNUP_SUCCESS_MESSAGE, USERNAME_TAKEN_MESSAGE } from "@/lib/constants";
import { userInput } from "zod-validation";
import { Argon2id } from "oslo/password";
import { apiResponse, handleApiError } from "helpers";
import { NextRequest } from "next/server";

interface UserValidation {
    username: string,
    password: string,
    adminId: string
}

export async function POST(req: NextRequest): Promise<Response> {
    try {
        const { parsedUsername, parsedPassword, adminId } = await getAndValidateBody(req)
        const hashedPassword = await new Argon2id().hash(parsedPassword)

        const usernameTaken = await checkUsernameInDb(parsedUsername);
        if (usernameTaken) {
            return apiResponse({ message: USERNAME_TAKEN_MESSAGE }, 409)
        }

        await createNewAdmin(parsedUsername, adminId, hashedPassword);
        return apiResponse({ message: SIGNUP_SUCCESS_MESSAGE }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}

const getAndValidateBody = async (req: Request): Promise<{ parsedUsername: string, parsedPassword: string, adminId: string }> => {
    const body: UserValidation = await req.json()
    const { username, password, adminId }: UserValidation = body;

    const parsedData = userInput.parse({ username, password })
    const parsedUsername = parsedData.username;
    const parsedPassword = parsedData.password;

    return { parsedUsername, parsedPassword, adminId }
}

const checkUsernameInDb = async (username: string): Promise<boolean> => {
    const usernameInDb = await prisma.admin.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true
        }
    });

    if (usernameInDb) {
        return true
    }

    return false;
}

const createNewAdmin = async (parsedUsername: string, adminId: string, hashedPassword: string): Promise<{ id: string }> => {
    const newAdmin = await prisma.admin.create({
        data: {
            id: adminId,
            username: parsedUsername,
            hashed_password: hashedPassword,
        },
        select: {
            id: true
        }
    });

    return newAdmin;
}