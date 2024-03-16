// app/login/google/callback/route.ts
import { google, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma"
import { preparedWord as randomWord } from "helpers";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const scope = url.searchParams.get("scope");
    const authuser = url.searchParams.get("authuser");
    const prompt = url.searchParams.get("prompt");
    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    const codeVerifier = cookies().get("google_oauth_codeVerifier")?.value ?? null;

    if (!code || !state || !scope || !authuser || !prompt || !storedState || !codeVerifier || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const googleAccountDetails = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        const googleAccount: GoogleAccount = await googleAccountDetails.json();

        // Replace this with your own DB client.
        const existingAdmin = await prisma.adminOAuthAccount.findUnique({
            where: {
                providerId: "google",
                providerUserId: parseFloat(googleAccount.id)
            }
        })

        if (existingAdmin) {
            const session = await lucia.createSession(existingAdmin.admin_id, {}); //first argument will be interpreted as userId:existingAdmin.admin_id because lucia.
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/"
                }
            });
        }

        const adminId = generateId(15);

        await prisma.admin.create({
            data: {
                id: adminId,
                adminname: randomWord,
                email: googleAccount.email
            }
        });

        await prisma.adminOAuthAccount.create({
            data: {
                providerId: "google",
                providerUserId: parseFloat(googleAccount.id),
                admin_id: adminId
            }
        })

        const session = await lucia.createSession(adminId, {}); //first argument will be interpreted as userId:adminId because lucia.
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        console.error(e)
        if (e instanceof OAuth2RequestError) {
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
}

interface GoogleAccount {
    id: string;
    sub: string;
    login: string;
    name: string;
    email: string;
}


