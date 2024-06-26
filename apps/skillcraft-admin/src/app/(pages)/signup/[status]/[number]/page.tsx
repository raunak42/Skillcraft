import { lucia, validateRequest } from "@/auth";
import { Session, generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Login } from "@/components/Login/Login";
import { ApiResponseAttributes } from "types";
import {
  ADMIN_BASE_URL,
  SIGNUP_SUCCESS_MESSAGE,
  USERNAME_TAKEN_MESSAGE,
} from "@/lib/constants";
import { SignupWarnings } from "./SignupWarnings";
import { RedirectButton } from "./RedirectButton";

interface PageParams {
  params: {
    status: string;
    number: number;
  };
}

export default async function Page({ params }: PageParams) {
  const existingSession = (await validateRequest()).session;

  if (!existingSession) {
    return (
      <form
        action={signupAndStartSession}
        className=" flex flex-col items-center justify-center"
      >
        <div className=" flex flex-col items-start justify-start">
          <Login buttonText="Signup" />
          <SignupWarnings status={params.status} />
        </div>
      </form>
    );
  }
  if (existingSession) {
    return <RedirectButton />;
  }
}

async function signupAndStartSession(formData: FormData): Promise<any> {
  "use server";
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const adminId = generateId(15);

  const res = await fetch(`${ADMIN_BASE_URL}/api/signup`, {
    method: "POST",
    body: JSON.stringify({ username, password, userId: adminId }),
  });

  const response: ApiResponseAttributes = await res.json();
  const randomNo = Math.floor(Math.random() * 1000000000000000) + 1;

  if (response.error) {
    //signup route returns error only when there is a zod error
    return redirect(`/signup/invalid/${randomNo}`);
  }
  if (response.message === USERNAME_TAKEN_MESSAGE) {
    return redirect(`/signup/taken/${randomNo}`);
  }
  if (response.message === SIGNUP_SUCCESS_MESSAGE) {
    const session = await lucia.createSession(adminId, {}); //createSession will succeed only if there is an admin already created in the db, this function creates sesssion and references userId field of the existing admin.
    startSession(session);
  }
}

const startSession = (session: Session) => {
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    "auth_session_admin",
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/create");
};
