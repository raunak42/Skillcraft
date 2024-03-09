// middleware.ts   
//the below code first checks if the user is logged in or not
//then it tries to configure csrf prevention//
import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { validateRequest } from "./auth";

export async function middleware(request: NextRequest, response: NextResponse): Promise<NextResponse> {

	const { session, user } = await validateRequest();
	if (session) {
		const response = NextResponse.next();
		response.headers.set("session-data", JSON.stringify({ session, user }))
		if (request.method === "GET") {
			return NextResponse.next();
		}
		const originHeader = request.headers.get("Origin");
		// NOTE: You may need to use `X-Forwarded-Host` instead
		const hostHeader = request.headers.get("Host");
		if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
			return new NextResponse(null, {
				status: 403
			});
		}
		return response;
	} else {
		return NextResponse.json({message: "Sign in first."}, {
			status: 403
		})
	}

}

export const config = {
	matcher: ["/api/buyCourse/:path*"] //spare the paths that are to be used for ssr, these paths don't require authentication, they are for seo
}
//middleware here, works for every path including frontend paths if not configuerd with a matcher