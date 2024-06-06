import { validateRequest } from "@/auth";
import { Display } from "./Display";

export default async function Page() {
  const { session, user } = await validateRequest();
  return <Display session={session} user={user} />;
}
