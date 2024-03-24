import { SessionAttributes } from "types";

export function getSessionDataFromMiddleware(req: Request): SessionAttributes | null {
    const sessionDataHeader = req.headers.get('session-data')
    if (!sessionDataHeader) {
        return null;
    }
    const { session, user }: SessionAttributes = JSON.parse(sessionDataHeader);
    return { session, user };
}