import { prisma } from "@/lib/prisma";
import { ActionResult } from "next/dist/server/app-render/types";
import { ZodError } from "zod";
import { SIGNUP_SUCCESS_MESSAGE, USERNAME_TAKEN_MESSAGE } from "@/lib/constants";
import { userInput } from "zod-validation";
import { Argon2id } from "oslo/password"

interface UserValidation {
    username: string,
    password: string,
    adminId: string
}

export async function POST(req: Request): Promise<Response | ActionResult> {
    try {
        const { parsedUsername, parsedPassword, adminId } = await getAndValidateBody(req)
        const hashedPassword = await new Argon2id().hash(parsedPassword)

        const usernameTaken = await checkUsernameInDb(parsedUsername);
        if (usernameTaken) {
            return Response.json(USERNAME_TAKEN_MESSAGE, { status: 409 })
        }

        const newAdmin = await createNewAdmin(parsedUsername, adminId, hashedPassword);
        if (newAdmin instanceof Response) {
            const response = newAdmin;
            return response;
        }
        return Response.json(SIGNUP_SUCCESS_MESSAGE, { status: 200 })

    } catch (error) {
        console.error(error);
        if (error instanceof ZodError) {
            const errorMessage = error.issues.map((t) => { return `${t.message} at ${t.path}` })
            return Response.json(errorMessage, { status: 400 })

        }
        if (error instanceof Error) { //one of the triggers of this if statement is when the client doesn't send a body
            return Response.json(error.message, { status: 500 })
        }
        return Response.json(error, { status: 500 })
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

const createNewAdmin = async (parsedUsername: string, adminId: string, hashedPassword: string): Promise<{ id: string } | Response> => {
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
    if (!newAdmin) {
        return Response.json("couldn't reach the database", { status: 500 })
    }

    return newAdmin;
}