import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  return (
    <div>
      <h1>Sign in</h1>
      <a href="/login/github">Sign in with GitHub</a>
      <br />
      <a href="/login/google">Sign in with Google</a>
      <br />
      <h1>Sign in with username and password</h1>
      <form action={login}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" style={{ color: "black" }} />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          style={{ color: "black" }}
        />
        <br />
        <button>Continue</button>
      </form>
    </div>
  );
}
async function login(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = await prisma.admin.findUnique({
    where: {
      adminname: username,
    },
  });

  const hashed_password = await new Argon2id().hash(password);

  if (!existingUser || !hashed_password) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password,
    password
  );
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

interface ActionResult {
  error: string;
}
