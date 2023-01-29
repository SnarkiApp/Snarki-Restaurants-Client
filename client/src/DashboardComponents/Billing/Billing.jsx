import React, {useEffect, useState} from "react";
import { useMutation, useLazyQuery } from '@apollo/client';
import { CANCEL_SUBSCRIPTION } from "./queries/cancelSubscription";
import { CREATE_CUSTOMER_PORTAL_SESSION } from "./queries/createCustomerPortalSession";
import { USER_BILLING } from "./queries/getBilling";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt, FaTimes } from 'react-icons/fa';
import "./Billing.css";

const Billing = () => {
    let navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    // const [cancelSubscription] = useMutation(CANCEL_SUBSCRIPTION);
    const [createCustomerPortalSession] = useMutation(CREATE_CUSTOMER_PORTAL_SESSION);
    const [userBilling] = useLazyQuery(USER_BILLING, {
        variables: {
            billing: true
        }
    });

    const fetchUserRequests = async () => {
        const {data} = await userBilling();

        if (data.restaurantRequests.code === 200) {
            setRequests(data.restaurantRequests.restaurants);
        }
    }

    useEffect(() => {
        fetchUserRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onManageSubscription = async () => {

        const {data} = await createCustomerPortalSession();

        if (data.createCustomerPortalSession.code === 200) {
            window.open(data.createCustomerPortalSession.url);
        }

    }

    return (
        <div className="billing-container">
            <div className="billing-title">Manage Billing</div>
            <div className="billing-subheading">
                <span>To manage your subscriptions, update payment methods and plans, click </span>
                <span onClick={onManageSubscription} className="manage-billing-link">Manage Billing</span>
            </div>
            <div className="table-container">
                {
                    requests && requests.length ? (
                        <table className="requests">
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Restaurant</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Next Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    requests.map((request, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{request.name}</td>
                                            <td>{request.address}, {request.city}, {request.state}, {request.postalCode}</td>
                                            <td className="status">
                                                {
                                                    (!request.subscriptionId || request.subscriptionStatus != "active") ? (
                                                        <button
                                                            type="submit"
                                                            className="paynow"
                                                            onClick={() => navigate(`/subscription/${request.restaurantId}/price_1L6td8EENlNwB06RkmIFnsVp`)}
                                                        >
                                                            Pay Now
                                                        </button>
                                                    ) : request.subscriptionStatus.toUpperCase()
                                                }
                                            </td>
                                            <td>{request.endDate}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : "Please claim / register atleast 1 restaurant to access billing."
                }
            </div>
        </div>
    );

};

export default Billing;
