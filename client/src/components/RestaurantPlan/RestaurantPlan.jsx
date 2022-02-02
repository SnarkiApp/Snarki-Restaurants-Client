import React from "react";

import info from "../../assets/info.svg";
import "./RestaurantPlan.css";

const RestaurantPlan = () => {

    return (
        <div className="restaurant-plan">
            <div className="restaurant-plan-image-container">
                <img src={info} alt="Raining Cash" className="restaurant-plan-image" />
            </div>
            <div className="plan-title">As a Restaurant,</div> <br />
            <div className="plan-subtitle">Do you want to save money AND reach customers in your area?</div> <br />
            <div className="plan-subtitle">Do other sites promise low prices and you end up paying an arm and a leg?</div>

            <div className="plan-title">Snarki solves this for you</div> <br />
            <div className="snarki-price-container">
                <></>
                
            </div>
        </div>
    );

};

export default RestaurantPlan;
