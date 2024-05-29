import { validateRequest } from "@/auth";
import SessionNavbar from "./SessionNavbar";



export const SessionNavbarSSR: React.FC = async () => {
  const {session, user} = await validateRequest();
  return <SessionNavbar session={session} authUser={user} />;
};
