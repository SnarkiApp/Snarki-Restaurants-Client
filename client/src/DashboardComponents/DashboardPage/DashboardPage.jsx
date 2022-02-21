import React, {useContext, useState} from "react";
import { useFormik } from 'formik'
import DOMPurify from 'dompurify';
import { useNavigate } from "react-router-dom";
import {IoIosRestaurant, IoIosArrowRoundForward} from 'react-icons/io';
import { useLazyQuery } from '@apollo/client';
import {UserContext} from "../../providers/User/UserProvider";
import {GET_RESTAURANTS} from "./queries/getRestaurants";
import { useDispatch } from 'react-redux';
import {setClaimRestaurant} from '../../redux/reducers/addClaimRestaurant';
import "./DashboardPage.css";

const DashboardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [getRestaurants] = useLazyQuery(GET_RESTAURANTS);

    const cleanData = (value) => DOMPurify.sanitize(value);

    const formik = useFormik({
        initialValues: {
            restaurantName: ""
        },
        onSubmit: async (values) => {
            const cleanRestaurantName = cleanData(values.restaurantName);

            if (cleanRestaurantName) {
                const {data} = await getRestaurants({
                    variables: {
                        name: cleanRestaurantName
                    },
                });
                setRestaurantsList(data.getRestaurants.restaurants);
            }
        },
    });

    return (
        <div className="dashboard-page-container">
            {
                user && !user.verified ? (
                    <div className="unverified-actions">

                        <form onSubmit={formik.handleSubmit}>
                            <label
                                htmlFor="restaurantName"
                                className="unverified-actions-heading"
                            >
                                Search Your Restaurant
                            </label>
                            <div className="actions-input-container">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    id="restaurantName"
                                    name="restaurantName"
                                    label="restaurantName"
                                    placeholder="Restaurant Name"
                                    onChange={formik.handleChange}
                                    className="unverified-actions-input"
                                    value={formik.values.restaurantName}
                                />
                                <button type="submit">Search</button>
                            </div>
                        </form>

                        <div className="restaurants-list-container">
                            {
                                restaurantsList.length > 0 ? (
                                    restaurantsList.map((restaurant, index) => (
                                        <div className="restaurant-list-item" key={index} onClick={async () => {
                                            await dispatch(setClaimRestaurant(restaurant));
                                            navigate("/dashboard/claim-restaurant");
                                        }}>
                                            <IoIosRestaurant
                                                size={60}
                                                className="restaurant-list-leading"
                                            />
                                            <div className="restaurant-list-item-details">
                                                <span className="restaurant-name">{restaurant.name}</span>
                                                <span className="restaurant-address">
                                                    {restaurant.address}{", "}
                                                    {restaurant.city}{", "}
                                                    {restaurant.state}{", "}
                                                    {restaurant.postalCode}
                                                </span>
                                            </div>
                                            <IoIosArrowRoundForward
                                                size={55}
                                                className="restaurant-list-trailing"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="restaurant-list-item" onClick={() => {
                                        navigate("/dashboard/add-restaurant")
                                    }}>
                                        <IoIosRestaurant
                                            size={60}
                                            className="restaurant-list-leading"
                                        />
                                        <div className="restaurant-list-item-details">
                                            <span className="add-restaurant">Add a new Restaurant</span>
                                        </div>
                                        <IoIosArrowRoundForward
                                            size={55}
                                            className="restaurant-list-trailing"
                                        />
                                    </div>
                                )
                            }
                        </div>

                    </div>
                ) : null
            }
        </div>
    );
};

export default DashboardPage;
