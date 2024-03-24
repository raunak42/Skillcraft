import { ZodError } from "zod";
import { apiResponse } from "./apiResponse";
import { Prisma } from "db"

//*******console.error(error) is for api developers*******//////////
//*******apiResponse(error) is for client-developers/client*******////////

export const handleApiError = (error: unknown): Response => {
    console.error(error)//for developers
    if (error instanceof ZodError) {
        const message = error.issues.map((t) => `${t.message} at ${t.path}`);
        return apiResponse({ error: message }, 403)
    }
    if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientKnownRequestError
    ) {
        return apiResponse({ error: error.message }, 500)
    }
    if (error instanceof Error) { //the above errors are instanceof Error, so even if the above two if-blocks are removed, this block will catch those errors, we are keeping the blocks seperate for handling different types of error mesages.
        return apiResponse({ error: error.message }, 500)
    }

    return apiResponse({ error: "An unknown error occurred." }, 500)
}