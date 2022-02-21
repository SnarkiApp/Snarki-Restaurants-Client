import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import logo from '../../assets/logo192.png';
import "./DashHeader.css";

const Header = () => {

    const navigate = useNavigate();
    return (
        <div className="dash-header">
            <Sidebar dashboard={true} />
            <div className="dash-header-left" onClick={() => navigate("/")}>
                <img className="dash-header-left-icon" src={logo} alt="snarki-logo" />
                <span className="dash-header-left-title">SNARKI</span>
            </div>
        </div>
    );

};

export default Header;
