import React, { useState, useContext, useEffect } from "react";
import * as AiIcons from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { StripeContext } from '../../providers/Stripe/StripeProvider';

import "./SuccessPayment.css";

export const SuccessDisplay = () => {
    let navigate = useNavigate();
    const [message, setMessage] = useState({});
    const { getPaymentIntent, stripe } = useContext(StripeContext);

    useEffect(() => {
        const getPaymentIntentUtil = async () => {
          const stripeInstance = await stripe;
          const resMessage = await getPaymentIntent(stripeInstance);
          if (resMessage) setMessage(resMessage);
        }
    
        getPaymentIntentUtil();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [stripe]);

    return (
        <div className="success-container">
            <div className="success-parent-container">
                <div className="success-heading">
                    {   
                        message.type === "success" ?
                        <AiIcons.AiFillCheckCircle
                            size={100}
                            color={"green"}
                        /> : null
                    }
                    {   
                        message.type === "processing" ?
                        <AiIcons.AiFillExclamationCircle
                            size={100}
                            color={"yellow"}
                        /> : null
                    }
                    {   
                        message.type === "error" ?
                        <AiIcons.AiFillCloseCircle
                            size={100}
                            color={"red"}
                        /> : null
                    }
                    <h1>Payment Success</h1>
                    <h4>You can check the final status of subsciption payment in dashboard billing tab</h4>
                </div>
                <div className='success-next-actions'>
                    <form>
                        <button
                            type="submit"
                            className="pricing-submit"
                            onClick={() => navigate("/dashboard/billing")}
                        >
                            Manage Billing Information
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};