import { validateRequest } from "@/auth";
import SessionNavbar from "./SessionNavbar";
import NoSessionNavbar from "./NoSessionNavbar";

export const Navbar: React.FC = async () => {
  const { session, user } = await validateRequest();

  return (
    <div>
      {session && <SessionNavbar authUser={user} session={session} />}
      {!session && <NoSessionNavbar />}
    </div>
  );
};
