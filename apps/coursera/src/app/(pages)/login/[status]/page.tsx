import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers"; //this requires the server, hence cannot mark the page with 'use client', hence cannot use state variables, hence need to use <form>
import { ApiResponseAttributes } from "types";
import {
  BASE_URL_DEV,
  INVALID_USRNM_PSWRD_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
} from "@/lib/constants";
import { Session } from "lucia";
import { Login } from "@/components/Login/Login";
import { redirect } from "next/navigation";
import { LoginWarnings } from "./Loginwarnings";

interface PageParams {
  params: {
    status: string;
  };
}

export default async function Page({ params }: PageParams) {
  const { session } = await validateRequest();

  return (
    <form
      action={handleLogin}
      className=" flex flex-col items-center justify-center"
    >
      <div className=" flex flex-col items-start justify-start">
        <Login session={session} buttonText="Login" />
        {params.status !== "fresh" && <LoginWarnings />}
      </div>
    </form>
  );
}

export const handleLogin = async (formData: FormData) => {
  "use server"; //Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".
  const username = formData.get("username");
  const password = formData.get("password");

  const res = await fetch(`${BASE_URL_DEV}/api/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  const response: ApiResponseAttributes = await res.json();

  if (response.message === INVALID_USRNM_PSWRD_MESSAGE || response.error) {
    const randomNo = Math.floor(Math.random() * 1000000000000000) + 1;
    return redirect(`/login/${randomNo}`);
  }

  const user = response.data?.user;
  const userId = user?.id as string;
  const session = await lucia.createSession(userId, {});

  startSession(session);
};

const startSession = (session: Session) => {
  console.log("session started");
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/ssrLanding");
};
