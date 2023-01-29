import React, {useContext} from "react";
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../providers/User/UserProvider';
import "./RestaurantPlanItem.css";

const RestaurantPlanItems = ({
    planType = "",
    title = "",
    subtitle = "",
    price = "",
    duration = "month",
    perks = [],
    redirectUrl = "/snarki/register",
    redirectButtonText = "Sign Up Now!"
}) => {
    let navigate = useNavigate();
    const {user} = useContext(UserContext);

    return (
        <div className="snarki-price-container">
            <div className="price-heading">
                <span>{planType}</span>    
            </div>
            <div className="plan-type">{title}</div>
            <div className="plan-type-subheading">{subtitle}</div>
            <div className="plan-pricing-container">
                <span className="plan-price">{price}</span>
                <div className="plan-term">for a {duration}</div>
            </div>
            <div className="plan-details-container">
                {
                    perks.map((perk, index) => (
                        <div className="plan-details" key={index}>
                            <FaCheckCircle color="green" />
                            {perk}
                        </div>
                    ))
                }
            </div>
            {
                !user ? (
                    <button
                        type="submit"
                        className="pricing-submit"
                        onClick={() => navigate(redirectUrl)}
                    >
                        {redirectButtonText}
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="pricing-submit"
                        onClick={() => navigate("/subscription/62b61dd3f77de906e829c2ad/price_1L6td8EENlNwB06RkmIFnsVp")}
                    >
                        Checkout
                    </button>
                )
            }
        </div>
    );

};

export default RestaurantPlanItems;
