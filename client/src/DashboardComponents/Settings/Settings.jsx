import React, {useContext, useEffect, useState} from "react";
import { useLazyQuery } from '@apollo/client';
import {USER_REQUESTS} from "./queries/userRequests";
import { UserContext } from '../../providers/User/UserProvider';
import "./Settings.css";

const Settings = () => {
    const {user} = useContext(UserContext);
    const [requests, setRequests] = useState([]);
    const [userRequests] = useLazyQuery(USER_REQUESTS);

    const fetchUserRequests = async () => {
        const {data} = await userRequests();
        setRequests(data.restaurantRequests.restaurants);
    }

    useEffect(() => {
        fetchUserRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="settings-container">
            <div className="user-details">
                <div className="details-title">Email:</div>
                <span>{user?.email}</span>
            </div>
            <div className="requests-title">Requests</div>
            <div className="table-container">
                {
                    requests && requests.length ? (
                        <table className="requests">
                            <thead>
                                <tr>
                                    <th>Request Type</th>
                                    <th>Restaurant</th>
                                    <th>Address</th>
                                    <th>Postal Code</th>
                                    <th>Status</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    requests.map((request, index) => (
                                        <tr key={index}>
                                            <td>{request.type}</td>
                                            <td>{request.name}</td>
                                            <td>{request.address}, {request.city}, {request.state}</td>
                                            <td>{request.postalCode}</td>
                                            <td>{request.status}</td>
                                            <td>{request.reason ? request.reason : "--"}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : "No Requests Submitted!"
                }
            </div>
        </div>
    );

};

export default Settings;
