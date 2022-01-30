import React from "react";
import Navbar from "../Navbar/Navbar";

import logo from '../../assets/logo192.png';
import "./Header.css";

const Header = ({navbarRefs}) => {

    return (
        <div className="header">
            <div className="header-left">
                <img className="header-left-icon" src={logo} alt="snarki-logo" />
                <span className="header-left-title">SNARKI</span>
            </div>

            <Navbar navbarRefs={navbarRefs} />
        </div>
    );

};

export default Header;
