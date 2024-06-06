// app/login/github/callback/route.ts
// import { github, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma";
import { preparedWord as randomUsername } from "helpers";
import { github, lucia, validateRequest } from "@/auth";


export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("github_oauth_state_admin")?.value ?? null;

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }
    console.log(await validateRequest());

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        const githubUser: GitHubUser = await githubUserResponse.json();
        console.log("githubUser", githubUser)

        const existingUser = await prisma.adminOAuthAccount.findUnique({
            where: {
                providerId: "github",
                providerUserId: githubUser.id,
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

        await prisma.admin.create({
            data: {
                id: userId,
                username: randomUsername,
                avatar:githubUser.avatar_url
            }
        });

        await prisma.adminOAuthAccount.create({
            data: {
                providerId: "github",
                providerUserId: githubUser.id,
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

interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string
}