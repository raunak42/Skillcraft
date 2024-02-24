// app/login/google/callback/route.ts
import { google, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import prisma from "@/lib/prisma";
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


"https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=1080959343984-dvnipj09v9oaeiuek4g80g9t85ed01ub.apps.googleusercontent.com&state=WSmUpbzGy_MS9s8F3CIQxgi5YGvuQK-f39ePgLBGyuA&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&code_challenge_method=S256&code_challenge=lK_sN0R1ZRhp8rg_yPxddSyi9WL3S5_KRQliPBLJG2w&nonce=_&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow"

"https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=1080959343984-dvnipj09v9oaeiuek4g80g9t85ed01ub.apps.googleusercontent.com&state=JLVEfJFROOevoAhJ7XgUbdrU1SMqRyab5SjeCu-R8Z8&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&code_challenge_method=S256&code_challenge=HyjLmm2nG0y7GJiPe7zV0SpH1ti3E8x_diqkWAky_n8&nonce=_&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow"

"http://localhost:3000/login?state=JLVEfJFROOevoAhJ7XgUbdrU1SMqRyab5SjeCu-R8Z8&code=4%2F0AeaYSHBo4lWba-kha0zxwJDMH2N1Om-c68Ety36Rl9LGaRy56M8y_Nd6GRl28tAp0IDgCw&scope=openid&authuser=3&prompt=consent"

"http://localhost:3000/login?state=WSmUpbzGy_MS9s8F3CIQxgi5YGvuQK-f39ePgLBGyuA&code=4%2F0AeaYSHBS_hdssvR3b9jZIdQHz73Yl5wzaGRgUOvrjmZLLZ99zgvH08i72AuG0cLcm1GK8w&scope=openid&authuser=0&prompt=consent"