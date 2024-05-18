"use client";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

interface TheFormProps {
  clientSecret: any;
}

export const TheForm: React.FC<TheFormProps> = ({ clientSecret }) => {
  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "stripe",
    },
  };
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  return (
    // <Elements stripe={stripePromise} options={options}>
    //   <CheckoutForm />
    // </Elements>
    <div className="">
      <EmbeddedCheckoutProvider
        options={{ clientSecret: clientSecret }}
        stripe={stripePromise}
      >
        <EmbeddedCheckout className=""></EmbeddedCheckout>
      </EmbeddedCheckoutProvider>
    </div>
  );
};
