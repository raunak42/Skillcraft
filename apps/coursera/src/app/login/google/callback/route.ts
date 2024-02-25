// app/login/google/callback/route.ts
import { google, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma"
import randomWord from "@/helpers/randomWord";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const scope = url.searchParams.get("scope");
    const authuser = url.searchParams.get("authuser");
    const prompt = url.searchParams.get("prompt");
    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    const codeVerifier = cookies().get("google_oauth_codeVerifier")?.value ?? null;

    console.log({ url })

    if (!code || !state || !scope || !authuser || !prompt || !storedState || !codeVerifier || state !== storedState) {
        console.log(0.2)
        return new Response(null, {
            status: 400
        });
    }

    try {
        console.log(1)
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        console.log(2)
        const googleUserResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        console.log(3)

        const googleUser: GoogleUser = await googleUserResponse.json();
        console.log("googleUser ", googleUser)

        // Replace this with your own DB client.
        const existingUser = await prisma.oAuthAccount.findUnique({
            where: {
                providerId: "google",
                providerUserId: parseFloat(googleUser.id)
            }
        })

        if (existingUser) {
            const session = await lucia.createSession(existingUser.user_id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/"
                }
            });
        }

        const userId = generateId(15);

        await prisma.user.create({
            data: {
                id: userId,
                username: randomWord,
                email: googleUser.email
            }
        });

        await prisma.oAuthAccount.create({
            data: {
                providerId: "google",
                providerUserId: parseFloat(googleUser.id),
                user_id: userId
            }
        })

        const session = await lucia.createSession(userId, {});
        console.log("Session: ", session)
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        // the specific error message depends on the provider
        console.error(e)
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
}

interface GoogleUser {
    id: string;
    sub: string;
    login: string;
    name: string;
    email: string;
}


