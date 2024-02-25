// app/login/google/route.ts
import { generateState, generateCodeVerifier } from "arctic";
import { google } from "@/auth";
import { cookies } from "next/headers";
import * as dotenv from "dotenv";

dotenv.config();
export async function GET(): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ]

    const url = await google.createAuthorizationURL(state, codeVerifier, { scopes })
    console.log(url)
    console.log(codeVerifier)

    cookies().set("google_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });

    cookies().set("google_oauth_codeVerifier", codeVerifier, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    })

    return Response.redirect(url);
}