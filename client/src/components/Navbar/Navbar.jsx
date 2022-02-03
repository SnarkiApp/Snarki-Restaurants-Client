import React from 'react';
import {  Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({navbarRefs}) => {
  const scrollToElement = (eleRef) => {
    if (eleRef.current) eleRef.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className="navbar">
        <li className="navbar-li" onClick={() => scrollToElement(navbarRefs[0])}>
            <Link className="navbar-li-link" to="/">Home</Link>
        </li>
        <li className="navbar-li" onClick={() => scrollToElement(navbarRefs[1])}>
            <Link className="navbar-li-link" to="/">How It Works</Link>
        </li>
        <li className="navbar-li" onClick={() => scrollToElement(navbarRefs[2])}>
            <Link className="navbar-li-link" to="/">About Us</Link>
        </li>
        <li className="navbar-li">
            <Link className="navbar-li-link" to="/premium">Premium</Link>
        </li>
        <li className="navbar-li">
            <Link className="navbar-li-link" to="/team">Team</Link>
        </li>
        <li className="navbar-li">
            <Link className="navbar-li-link" to="/contact">Contact</Link>
        </li>
        <li className="navbar-li">
            <Link className="navbar-li-link link-focused" to="/snarki/register">Sign Up!</Link>
        </li>
    </div>
  );
}

export default Navbar;
