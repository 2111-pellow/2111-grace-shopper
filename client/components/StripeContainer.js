import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51KIxdeDln4s4jzUmC2iVGwEhn3THaCORSorbdcBovd4cJzf1BpDPRmZfZU4SSRbuQBN97Ekwdb5J2HW463AoxmjZ00RdSYjvoA";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
