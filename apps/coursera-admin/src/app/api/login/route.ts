import { prisma } from "@/lib/prisma";
import { userInput } from "zod-validation";
import { Argon2id } from "oslo/password";
import { INVALID_USRNM_PSWRD_MESSAGE, LOGIN_SUCCESS_MESSAGE } from "@/lib/constants";
import { apiResponse, handleApiError } from "helpers";
import { PrismaAdminOutput } from "types";

export async function POST(req: Request): Promise<Response> {
    try {
        const body: { username: string, password: string } = await req.json();
        const { username, password } = await validateBody(body);

        const adminInDb = await findAdminInDb(username)
        if (!adminInDb) {
            return apiResponse({ message: INVALID_USRNM_PSWRD_MESSAGE }, 404)
        }

        const hashed_password = adminInDb.hashed_password as string;
        const validPassword = await verifyPassword(hashed_password, password);
        if (!validPassword) {
            return apiResponse({ message: INVALID_USRNM_PSWRD_MESSAGE }, 404)
        }
        return apiResponse({ message: LOGIN_SUCCESS_MESSAGE, data: { admin: adminInDb } }, 200)//If this response is returned, the frontend must start a new session by setting up cookies.

    } catch (error) {
        return handleApiError(error)
    }
}

const validateBody = async (body: { username: string, password: string }): Promise<{ username: string, password: string }> => {
    const parsedData = userInput.parse(body)
    return parsedData;
}

export const findAdminInDb = async (username: string): Promise<PrismaAdminOutput<{
    select: {
        id: true,
        hashed_password: true,
        username: true
    }
}> | null> => {
    const adminInDb = await prisma.admin.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            hashed_password: true,
            username: true,
        }
    })
    if (!adminInDb) {
        return null;
    }
    return adminInDb;
}

const verifyPassword = async (hashed_password: string, password: string): Promise<boolean> => {
    const validPassword = await new Argon2id().verify(
        hashed_password,
        password
    );

    return validPassword;
}