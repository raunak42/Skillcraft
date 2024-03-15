import { SessionAttributes } from "types";

export function getSessionDataFromMiddleware(req: Request): Response | SessionAttributes {
    const sessionDataHeader = req.headers.get('session-data')
    if (!sessionDataHeader) {
        return Response.json({ message: "sessionDataHeader not found" }, { status: 500 });//500 internal server error because middleware not working
    }
    const { session, user }: SessionAttributes = JSON.parse(sessionDataHeader);

    return { session, user };
}