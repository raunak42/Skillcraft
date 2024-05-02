import { GitHub, Google } from "arctic"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "@/lib/prisma"
import { Lucia, User, Session } from "lucia";
import { cookies } from "next/headers"
import * as dotenv from "dotenv";

// dotenv.config();

/*Important*/
const redirectURI = "http://localhost:3001/login/google/callback";

export const github = new GitHub(process.env.GITHUB_CLIENT_ID_ADMIN!, process.env.GITHUB_CLIENT_SECRET_ADMIN!);
export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, redirectURI)


const adapter = new PrismaAdapter(prisma.adminSession, prisma.admin)  // your adapter

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        // this sets cookies with super long expiration
        // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
        expires: false,
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            providerId: attributes.providerId,
            username: attributes.username
        };
    }
});

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes
    }
    interface DatabaseUserAttributes {
        providerId: string;
        username: string;
    }
}

// Memoization object for caching
const memoizedFunctions: Record<string, any> = {};

// Function to memoize other functions
function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const memoizedFn = (...args: Parameters<T>) => {
        const key = JSON.stringify(args);
        if (!memoizedFunctions[key]) {
            memoizedFunctions[key] = fn(...args);
        }
        return memoizedFunctions[key];
    };
    return memoizedFn as T;
}

// Function to validate request with memoization
export const validateRequest = async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        return {
            user: null,
            session: null
        };
    };

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (error) {
        console.error(error)
    }
    return result;
}
    ;

// Function to get user with memoization
export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;
    const { user, session } = await lucia.validateSession(sessionId);
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (error) {
        console.error(error)
        // Next.js throws error when attempting to set cookies when rendering page
    }
    return user;
}
