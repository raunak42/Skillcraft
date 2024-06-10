import { BASE_URL } from "@/lib/constants";
import { TheForm } from "../TheForm/TheForm";
import { validateRequest } from "@/auth";
import { PrismaCourseOutput } from "types";

interface CartPaymentProps {
  courses: PrismaCourseOutput<{
    select: {};
    include: { admin: true; users: true };
  }>[];
}

export const CartPayment: React.FC<CartPaymentProps> = async ({ courses }) => {
  const { session, user } = await validateRequest();

  const res = await fetch(`${BASE_URL}/api/cartCheckoutSession`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({
      courses,
      authSession: session,
      user,
    }),
  });
  const response = await res.json();

  if (!response) {
    return <div>Loading...</div>;
  }
  const clientSecret = response.clientSecret;
  return (
    <div className="" id="checkout">
      {response && clientSecret && <TheForm clientSecret={clientSecret} />}
    </div>
  );
};
