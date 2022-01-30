import React from "react";
import "./AboutUs.css";

const AboutUs = ({propRef}) => {

    return (
        <div className="about" ref={propRef}>
            <div className="about-title">About Us</div>
            <div className="about-text">
                Snarki started out as an answer to the most asked, yet most dreaded, question.
                “Where do you want to eat”?  Founded by a group of indecisive foodies who were stuck going to the same
                2 places over and over, they wanted to come up with a better solution.
                This led to the creation of Snarki; a mobile platform providing tailored restaurant searches
                based on the users' cuisine preferences. Try Snarki today and leave indecision behind.
            </div>
        </div>
    );

};

export default AboutUs;
