import React, {useContext, useState, useEffect} from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from '../../providers/User/UserProvider';
import CheckoutForm from "./CheckoutForm";
import { CREATE_SUBSCRIPTION } from "./queries/createSubscription";
import { StripeContext } from '../../providers/Stripe/StripeProvider';
import "./StripePayment.css";

const StripePayment = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [clientSecret, setClientSecret] = useState(false);
    const [message, setMessage] = useState(null);
    const {user} = useContext(UserContext);
    const [ createSubscription ] = useMutation(CREATE_SUBSCRIPTION);
    const { stripe } = useContext(StripeContext);

    useEffect(() => {
        if (!user) {
            return navigate("/snarki/register");
        }

        if (!params.priceId || !params.restaurant) return alert("Invalid Link");

        const createSubscriptionUtil = async () => {
            const {data} = await createSubscription({
                variables: {
                    priceId: params.priceId,
                    restaurant: params.restaurant
                }
            });

            if (data.createSubscription.code === 200) {
                setClientSecret(data.createSubscription.clientSecret);
            } else {
                setMessage(data.createSubscription.message);
            }
        }
      
        createSubscriptionUtil();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {
                clientSecret && (
                    <Elements
                        options={{clientSecret}}
                        stripe={stripe}
                    >
                        <CheckoutForm clientSecret={clientSecret} />
                    </Elements>
                )
            }
            {
                message && (
                    <div className="message-container">
                        <span className="message">
                            {message}
                        </span>
                    </div>
                )
            }
        </div>
    );

};

export default StripePayment;
