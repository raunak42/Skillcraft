// middleware.ts   
//the below code first checks if the user is logged in or not
//then it tries to configure csrf prevention//
//to send requests from postman, set a header called "origin" to the value of "http://localhost:3000"
import { Session, User, verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { apiResponse } from "helpers";

const unprotectedRoutes = ["/api/getCourses", "/api/getFeaturedCourses", "/api/getTopCourses", "/api/search", "/api/checkoutSession", "/api/cartCheckoutSession"] //for ssr //could have gone with the matcher approach for ssr routes but mathcer blocks the entire middleware for the path that is not included, that means session verification would have stopped but on top of that csrf prevention would also have stopped.
const noMiddlewareRoutes = ["/api/signup", "/api/login", "/api/checkoutSession", "/api/cartCheckoutSession", "/api/webhook", "/api/checkDbError"]

export async function middleware(request: NextRequest): Promise<Response | undefined> {
	const response = NextResponse.next();
	const noMiddlewareRoute = noMiddlewareRoutes.find((t) => t === request.nextUrl.pathname)
	const unprotectedRoute = unprotectedRoutes.find((t) => {
		const path = request.nextUrl.pathname
		if (path.startsWith(t)) {
			return true
		} else {
			return false
		}
	})
	if (noMiddlewareRoute) {
		return;
	}
	if (!unprotectedRoute) {
		const requestClone = request.clone();
		const requestData = await requestClone.text();
		if (!requestData) {
			console.log("No session data provided")
			return apiResponse({ message: "No session data provided" }, 400);
		}
		const requestBody = JSON.parse(requestData)

		const { session, user }: { session: Session | null, user: User | null } = requestBody.data

		if (!session) {
			return NextResponse.json({ message: "Sign in first." }, {
				status: 403
			})
		}
		// const response = NextResponse.next();
		response.headers.set("session-data", JSON.stringify({ session, user }));
	}
	// response.headers.set("session-data", ("86fd87g87"));

	if (request.method === "GET") {
		return response;
	}
	const originHeader = request.headers.get("Origin");
	const hostHeader = request.headers.get("Host"); // NOTE: You may need to use `X-Forwarded-Host` instead when using reverse proxy setups or load balancers
	
	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
		return apiResponse({ error: "failed" }, 403);
	}
	return response;

}

export const config = {
	matcher: [
		"/api/:path*",
	]
}
//middleware here, works for every path including frontend paths if not configuerd with a matcher