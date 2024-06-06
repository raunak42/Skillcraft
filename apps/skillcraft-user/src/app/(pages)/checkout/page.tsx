"use client";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useState, useEffect, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface responseType {
  clientSecret: string;
}

export default function Page() {
  const [response, setResponse] = useState<responseType>();
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const hasFetchedData = useRef(false); // Reference to track data fetching

  const fetchData = async () => {
    const res = await fetch("/api/paymentIntent", {
      method: "POST",
    });
    const response = await res.json();
    setResponse(response);
  };

  useEffect(() => {
    if (!hasFetchedData.current) { // Check if data has already been fetched
      fetchData();
      hasFetchedData.current = true; // Mark data as fetched
    }
  }, []); 

  if(!response){
    return<div>Loading...</div>
  }

  const clientSecret = response.clientSecret;
  const options:StripeElementsOptions = {
    clientSecret:clientSecret,
    appearance:{
        theme:"stripe"
    }
  }

  return (
    <div id="checkout">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
