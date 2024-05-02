// "use client";
import { lucia } from "@/auth";
import { cookies } from "next/headers"; //this requires the server, hence cannot mark the page with 'use client', hence cannot use state variables, hence need to use <form>
import { ApiResponseAttributes } from "types";
import { LOGIN_SUCCESS_MESSAGE } from "@/lib/constants";
import { Session } from "lucia";
import { Login } from "@/components/Login/Login";

export default async function Page() {
  return (
    <form
      action={handleClick}
      className="flex flex-col items-center justify-center"
    >
      <Login buttonText="Login" />
    </form>
  );
}

const handleClick = async (formData: FormData) => {
  "use server"; //Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".

  const username = formData.get("username");
  const password = formData.get("password");
  const startSession = (session: Session) => {
    console.log("session started");
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  };

  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  const response: ApiResponseAttributes = await res.json();
  console.log(response);
  if (!response) {
    return <div>Loading...</div>;
  }

  const { data, message, error } = response;

  if (!data || !data.user) {
    return;
  }
  const user = data.user;
  const userId = user.id as string;
  const session = await lucia.createSession(userId, {});

  console.log(message);
  console.log(LOGIN_SUCCESS_MESSAGE);
  if (message === LOGIN_SUCCESS_MESSAGE) {
    startSession(session);
  }

  if (error) {
    ("use server");
    console.error(error);
  }
};
