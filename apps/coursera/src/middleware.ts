// middleware.ts   
//the below code first checks if the user is logged in or not
//then it tries to configure csrf prevention//
//to send requests from postman, set a header called "origin" to the value of "http://localhost:3000"
import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { validateRequest } from "./auth";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const { session, user } = await validateRequest();
	if (!session) {
		return NextResponse.json({ message: "Sign in first." }, {
			status: 403
		})
	}
	const response = NextResponse.next();
	response.headers.set("session-data", JSON.stringify({ session, user }));
	if (request.method === "GET") {
		return response;
	}
	const originHeader = request.headers.get("Origin");
	const hostHeader = request.headers.get("Host"); // NOTE: You may need to use `X-Forwarded-Host` instead when using reverse proxy setups or load balancers
	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
		return new NextResponse("failed", {
			status: 403
		});
	}
	return response;

}

export const config = {
	matcher: ["/api/:path*"] //spare the paths that are to be used for ssr, these paths don't require authentication, they are for seo
}
//middleware here, works for every path including frontend paths if not configuerd with a matcher