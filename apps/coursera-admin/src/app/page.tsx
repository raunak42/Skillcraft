import { validateRequest } from "@/auth";
import { AuthRequiredError } from "@/lib/exceptions";

export default async function Home() {
  const sessionDetails = await validateRequest();
  const { session, user } = sessionDetails;
  
  if (!session) {
    throw new AuthRequiredError();
  }

  return (
    <div>
      <h2>Hello {user.username}</h2>
    </div>
  );
}
