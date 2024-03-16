// app/login/github/callback/route.ts
// import { github, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { prisma } from "@/lib/prisma";
import { preparedWord as randomUsername } from "helpers";
import { github, lucia } from "@/auth";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("github_oauth_state")?.value ?? null;

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubAccountDetails = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        const githubAccount: GitHubAccount = await githubAccountDetails.json();

        const existingAdmin = await prisma.adminOAuthAccount.findUnique({
            where: {
                providerId: "github",
                providerUserId: githubAccount.id,
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
                adminname: randomUsername,
            }
        });

        await prisma.adminOAuthAccount.create({
            data: {
                providerId: "github",
                providerUserId: githubAccount.id,
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

interface GitHubAccount {
    id: number;
    login: string;
}