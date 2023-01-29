import React, { useState, useContext, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { StripeContext } from '../../providers/Stripe/StripeProvider';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getPaymentIntent } = useContext(StripeContext);

  useEffect(() => {
    const getPaymentIntentUtil = async () => {
      const resMessage = await getPaymentIntent(stripe);
      if (resMessage) setMessage(resMessage);
    }

    getPaymentIntentUtil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/dashboard/billing/success` // TODO: HOSTED URL
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage({
        instant: true,
        message: error.message
      });
    } else {
      setMessage({
        instant: true,
        message: "An unexpected error occurred."
      });
    }

    setIsLoading(false);
  };

  const isInstantMessage = !!(Object.keys(message).length && message["message"].length && !message["instant"]);

  return (
    !isInstantMessage && (
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {
          Object.keys(message).length &&
          message.instant ?
          <div id="payment-message">{message.message}</div> : null
        }
      </form>
    )
  );
}
