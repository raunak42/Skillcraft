import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/auth";

export default async function Page() {
  return (
    <form action={logout}>
      <button className="p-4 bg-black rounded-full text-white font-semibold">Sign out</button>
    </form>
  );
}

export async function logout(): Promise<ActionResult> {
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
  
  return redirect("/ssrLanding");
}

interface ActionResult {
  error: string | null;
}
