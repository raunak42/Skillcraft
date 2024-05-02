import { lucia } from "@/auth";
import { Session, generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Login } from "@/components/Login/Login";
import { ApiResponseAttributes } from "types";
import { SIGNUP_SUCCESS_MESSAGE } from "@/lib/constants";

export default async function Page() {
  return (
    <form
      action={signupAndStartSession}
      className="flex flex-col items-center justify-center"
    >
      <Login buttonText="Signup" />
    </form>
  );
}

async function signupAndStartSession(formData: FormData): Promise<any> {
  "use server";
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const userId = generateId(15);

  const res = await fetch("http://localhost:3000/api/signup", {
    method: "POST",
    body: JSON.stringify({ username, password, userId }),
  });

  const response: ApiResponseAttributes = await res.json();
  if (response.message === SIGNUP_SUCCESS_MESSAGE) {
    const session = await lucia.createSession(userId, {}); //createSession will succeed only if there is an admin already created in the db, this function creates sesssion and references userId field of the existing admin.
    startSession(session);
  }
  return response.message;
}

const startSession = (session: Session) => {
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
};
