import React, {useContext} from "react";
import {UserContext} from "../../providers/User/UserProvider";
import "./AddRestaurant.css";

const AddRestaurant = () => {
    const {user} = useContext(UserContext);

    return (
        <div className="claim-restaurant-container">
            {
                user && !user.verified ? (
                    <span>add</span>
                ) : null
            }
        </div>
    );
};

export default AddRestaurant;
