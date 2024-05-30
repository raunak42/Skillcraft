import { prisma } from "@/lib/prisma";
import { SIGNUP_SUCCESS_MESSAGE, USERNAME_TAKEN_MESSAGE } from "@/lib/constants";
import { userInput } from "zod-validation";
import { Argon2id } from "oslo/password";
import { apiResponse, handleApiError } from "helpers";
import { NextRequest } from "next/server";
import { pixelAvatars } from "./randomAvatars";


interface UserValidation {
    username: string,
    password: string,
    userId: string
}

export async function POST(req: NextRequest): Promise<Response> {
    try {
        const { parsedUsername, parsedPassword, userId } = await getAndValidateBody(req)
        const hashedPassword = await new Argon2id().hash(parsedPassword)

        const usernameTaken = await checkUsernameInDb(parsedUsername);
        if (usernameTaken) {
            return apiResponse({ message: USERNAME_TAKEN_MESSAGE }, 409)
        }

        await createNewUser(parsedUsername, userId, hashedPassword);
        return apiResponse({ message: SIGNUP_SUCCESS_MESSAGE }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}

const getAndValidateBody = async (req: Request): Promise<{ parsedUsername: string, parsedPassword: string, userId: string }> => {
    const body: UserValidation = await req.json()
    const { username, password, userId }: UserValidation = body;

    const parsedData = userInput.parse({ username, password })
    const parsedUsername = parsedData.username;
    const parsedPassword = parsedData.password;

    return { parsedUsername, parsedPassword, userId }
}

const checkUsernameInDb = async (username: string): Promise<boolean> => {
    const usernameInDb = await prisma.user.findUnique({
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

const createNewUser = async (parsedUsername: string, userId: string, hashedPassword: string): Promise<{ id: string }> => {
    const randomIndex = Math.floor(Math.random() * pixelAvatars.length);

    const newUser = await prisma.user.create({
        data: {
            id: userId,
            username: parsedUsername,
            hashed_password: hashedPassword,
            avatar: pixelAvatars[randomIndex]
        },
        select: {
            id: true
        }
    });

    return newUser;
}