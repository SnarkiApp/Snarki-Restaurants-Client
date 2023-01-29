export const getPaymentIntent = async (stripe) => {
    let message = {};

    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    switch (paymentIntent.status) {
        case "succeeded":
            message = {
                instant: false,
                type: "success",
                message: "Payment succeeded!",
            };
            break;
        case "processing":
            message = {
                instant: false,
                type: "processing",
                message: "Your payment is processing.",
            };
            break;
        case "requires_payment_method":
            message = {
                instant: false,
                type: "error",
                message: "Your payment was not successful, please try again.",
            };
            break;
        default:
            message = {
                instant: false,
                type: "error",
                message: "Something went wrong.",
            };
            break;
    }

    return message;
};
