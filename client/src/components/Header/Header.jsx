import React from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

import logo from '../../assets/logo192.png';
import "./Header.css";

const Header = ({navbarRefs}) => {

    const navigate = useNavigate();
    return (
        <div className="header">
            <Sidebar />
            <div className="header-left" onClick={() => navigate("/")}>
                <img className="header-left-icon" src={logo} alt="snarki-logo" />
                <span className="header-left-title">SNARKI</span>
            </div>

            <Navbar navbarRefs={navbarRefs} />
        </div>
    );

};

export default Header;
