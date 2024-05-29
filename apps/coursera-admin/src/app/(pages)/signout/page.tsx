import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/auth";
import { Button } from "./button";

export default async function Page() {
  return (
    <form className="px-4" action={logout}>
      <Button />
    </form>
  );
}

export async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    console.log("No ongoing session.");
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    "auth_session_admin",
    sessionCookie.value,
    sessionCookie.attributes
  );
  // cookies().delete(sessionCookie); //So that when you try to log in another time, the browser doesn't remember which google/github account you were previously signed in with. This way auth gives you the option to sign in with one of your google/github accounts and doesn't directly sign you in with the previous account.
  console.log("Logged out.");
  return redirect("/login/fresh");
}

interface ActionResult {
  error: string | null;
}
