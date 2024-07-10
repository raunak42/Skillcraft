"use client";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
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
    <div className=" flex flex-col">
      <div className="w-full flex flex-col items-center justify-center mb-4">
       <h1 className="text-red-600">Dummy card credentials (Outside India):</h1>
        <img
          src="/testCard.png"
          className="w-[380px] rounded-xl "
        ></img>
      </div>
      <div className="w-full flex flex-col items-center justify-center mb-4">
       <h1 className="text-red-600">Dummy card credentials (India):</h1>
        <img
          src="/testCardIndia.png"
          className="w-[380px] rounded-xl "
        ></img>
      </div>
      <div>
        <EmbeddedCheckoutProvider
          options={{ clientSecret: clientSecret }}
          stripe={stripePromise}
        >
          <EmbeddedCheckout className=""></EmbeddedCheckout>
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};
