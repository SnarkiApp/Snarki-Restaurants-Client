import React from "react";
import { FaCheckCircle } from 'react-icons/fa';
import info from "../../assets/info.svg";
import RestaurantPlanItems from "./RestaurantPlanItems";
import "./RestaurantPlan.css";

const RestaurantPlan = () => (
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
        <RestaurantPlanItems
            planType="Best Value"
            title="Founder's Plan"
            subtitle="Be the first to promote your business on Snarki"
            price="$100"
            duration="month"
            perks={[
                "Target local customers searching for your cuisine",
                "Populate Higher on our search query",
                "Unlimited Promotions to customers"
            ]}
        />
    </div>
);

export default RestaurantPlan;
