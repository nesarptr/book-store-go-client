import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import axios from "../../axiosConfig";

import styles from "./Payment.module.css";

export default function Payment({ id }: { id: string }) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/stp-key");
        const { key } = data;
        setStripePromise(loadStripe(key));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(`/shop/pay/${id}`);
        const { clientSecret } = data;
        setClientSecret(clientSecret);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return (
    <main className={styles.main}>
      <h1>You Can Pay Here!</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  );
}
