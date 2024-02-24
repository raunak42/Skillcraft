// app/login/github/callback/route.ts
// import { github, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { prisma } from "db"
import randomUsername from "@/helpers/randomWord";
import { github, lucia } from "@/auth"


export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("github_oauth_state")?.value ?? null;

    console.log({ url })
    console.log({ code })
    console.log({ state })
    console.log({ storedState })
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        const githubUser: GitHubUser = await githubUserResponse.json();
        console.log("githubUser ", githubUser)

        const existingUser = await prisma.oAuthAccount.findUnique({
            where: {
                providerId: "github",
                providerUserId: githubUser.id,
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
                username: randomUsername,
            }
        });

        await prisma.oAuthAccount.create({
            data: {
                providerId: "github",
                providerUserId: githubUser.id,
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

interface GitHubUser {
    id: number;
    login: string;
}