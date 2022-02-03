import React from "react";
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import info from "../../assets/info.svg";
import "./RestaurantPlan.css";

const RestaurantPlan = () => {

    let navigate = useNavigate();
    return (
        <div className="restaurant-plan">
            <div className="restaurant-plan-image-container">
                <img src={info} alt="Raining Cash" className="restaurant-plan-image" />
            </div>
            <div className="plan-title">As a Restaurant,</div> <br />
            <div className="plan-subtitle">
                <FaCheckCircle color="green" />
                Do you want to save money AND reach customers in your area?</div>
            <div className="plan-subtitle">
                <FaCheckCircle color="green" />
                Do other sites promise low prices and you end up paying an arm and a leg?
            </div>
            <div className="plan-subtitle">
                <FaCheckCircle color="green" />
                Do you want to save money AND reach customers in your area?
            </div>

            <div className="plan-title">Snarki solves this for you</div> <br />
            <div className="snarki-price-container">
                <div className="price-heading">
                    <span>Best Value</span>    
                </div>
                <div className="plan-type">Founder's Plan</div>
                <div className="plan-type-subheading">Be the first to promote your business on Snarki</div>
                <div className="plan-pricing-container">
                    <span className="plan-price">$100</span>
                    <div className="plan-term">for a month</div>
                </div>
                <div className="plan-details-container">
                    <div className="plan-details">
                        <FaCheckCircle color="green" />
                        Target local customers searching for your cuisine
                    </div>
                    <div className="plan-details">
                        <FaCheckCircle color="green" color="green" />
                        Populate Higher on our search query
                    </div>
                    <div className="plan-details">
                        <FaCheckCircle color="green" />
                        Unlimited Promotions to customers
                    </div>
                </div>
                <button
                    type="submit"
                    className="pricing-submit"
                    onClick={() => navigate("/snarki/register")}
                >
                    Sign Up Now!
                </button>
            </div>
        </div>
    );

};

export default RestaurantPlan;
