import { validateRequest } from "@/auth";
import { Display } from "./Display";
import { Session, User } from "lucia";

interface PageProps {
  session: Session | null;
  user: User | null;
}

export default async function Page({ session, user }: PageProps) {
  // const { session, user } = await validateRequest();
  return <Display session={session} user={user} />;
}
