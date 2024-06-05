import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/auth";
import { Button } from "./button";

export default async function Page() {
  return (
    <form action={logout}>
      <Button />
    </form>
  );
}

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  // cookies().delete(sessionCookie.name) //So that when you try to log in another time, the browser doesn't remember which google/github account you were previously signed in with. This way auth gives you the option to sign in with one of your google/github accounts and doesn't directly sign you in with the previous account.

  return redirect("/home");
}

interface ActionResult {
  error: string | null;
}
