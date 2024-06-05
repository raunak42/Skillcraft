import { validateRequest } from "@/auth";
import NoSessionNavbar from "./NoSessionNavbar";
import SessionNavbar from "./SessionNavbar";

export const Navbar: React.FC = async () => {
  const { session, user } = await validateRequest();
  if (!session) {
    return <NoSessionNavbar />;
  }
  if (session) {
    return <SessionNavbar authUser={user} session={session} />;
  }
};
