import { validateRequest } from "@/auth";
import { ModalContent } from "./ModalContent";

export const Modal = async () => {
  const { session, user } = await validateRequest();

  return <ModalContent session={session} user={user} />;
};
