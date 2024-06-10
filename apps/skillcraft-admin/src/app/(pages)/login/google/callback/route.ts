// app/login/google/callback/route.ts
import { google, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma"
import { generateRandomWord } from "@/helpers/randomWord";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const scope = url.searchParams.get("scope");
    const authuser = url.searchParams.get("authuser");
    const prompt = url.searchParams.get("prompt");
    const storedState = cookies().get("google_oauth_state_admin")?.value ?? null;
    const codeVerifier = cookies().get("google_oauth_codeVerifier_admin")?.value ?? null;

    if (!code || !state || !scope || !authuser || !prompt || !storedState || !codeVerifier || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const googleUserResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        const googleUser: GoogleUser = await googleUserResponse.json();

        // Replace this with your own DB client.
        const existingUser = await prisma.adminOAuthAccount.findUnique({
            where: {
                providerId: "google",
                providerUserId: parseFloat(googleUser.id)
            }
        })

        if (existingUser) {
            const session = await lucia.createSession(existingUser.admin_id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set("auth_session_admin", sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/create"
                }
            });
        }

        const userId = generateId(15);
        const randomWord = await generateRandomWord()


        await prisma.admin.create({
            data: {
                id: userId,
                username: randomWord,
                email: googleUser.email,
                avatar: googleUser.picture
            }
        });

        await prisma.adminOAuthAccount.create({
            data: {
                providerId: "google",
                providerUserId: parseFloat(googleUser.id),
                admin_id: userId
            }
        })

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set("auth_session_admin", sessionCookie.value, sessionCookie.attributes);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/create"
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
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}


