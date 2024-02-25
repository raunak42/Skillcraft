// app/login/github/route.ts
import { generateState } from "arctic";
import { github } from "@/auth";
import { cookies } from "next/headers";
import * as dotenv from "dotenv";

dotenv.config();
export async function GET(): Promise<Response> {
	const state = generateState();
	const url = await github.createAuthorizationURL(state);

	cookies().set("github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});
	console.log("URL: ", url)
	return Response.redirect(url);
}