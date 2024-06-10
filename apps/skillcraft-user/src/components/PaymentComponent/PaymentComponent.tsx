import { BASE_URL } from "@/lib/constants";
import { TheForm } from "../TheForm/TheForm";
import { validateRequest } from "@/auth";

interface PaymentComponentProps {
  title: string;
  price: number;
  imageLink: string;
  id: string | number;
}

export const PaymentComponent: React.FC<PaymentComponentProps> = async ({
  title,
  price,
  imageLink,
  id,
}) => {
  const { session, user } = await validateRequest();

  const res = await fetch(`${BASE_URL}/api/checkoutSession`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({
      course: {
        name: title,
        price: price,
        imageLink: imageLink,
        id: id,
      },
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
