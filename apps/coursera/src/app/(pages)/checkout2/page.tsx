import { BASE_URL_DEV } from "@/lib/constants";
import { TheForm } from "@/components/TheForm/TheForm";

export default async function Page() {
  const res = await fetch(`${BASE_URL_DEV}/api/checkoutSession`, {
    method: "POST",
    cache: "no-store",
  });
  const response = await res.json();

  if (!response) {
    return <div>Loading...</div>;
  }
  const clientSecret = response.clientSecret;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[35%]" id="checkout">
        {clientSecret && <TheForm clientSecret={clientSecret} />}
      </div>
    </div>
  );
}
