import React from "react";

import profilePic1 from '../../assets/profilePic1.jpg';
import profilePic2 from '../../assets/profilePic2.jpeg';
import profilePic3 from '../../assets/profilePic3.jpg';
import "./Team.css";

const Card = ({title, name, description, src}) => (

    <div className="card-container">
        <img src={src} className="card-image" alt="Tj Profile Pic" />
        <div className="card-content">
            <div className="card-title">{title}</div>
            <div className="card-name">{name}</div>
            <div className="card-description">{description}</div>
        </div>
    </div>

);

const Team = () => {
    return (
        <div className="team">
            <div className="team-header">
                <div className="team-header-title">Meet the Team</div>
            </div>
            <div className="team-card">
                <Card
                    src={profilePic1}
                    title={"Founder and CEO"}
                    name={"Tj Franco"}
                    description={
                        `B.S. in Business Management from the Dolan School of Business at Fairfield University.\n
                        6+ years in Management`
                    }
                />

                <Card
                    src={profilePic2}
                    title={"Chief Revenue Officer"}
                    name={"Jean Carlos Martinez"}
                    description={
                        `B.S. in Economics from SUNY Binghamton.\n
                        5+ years in Sales`
                    }
                />

                <Card
                    src={profilePic3}
                    title={"Chief Technology Officer"}
                    name={"Shubham Sapra"}
                    description={
                        `B.E. in Computer Science from Chitkara University.\n
                        3+ Years as FullStack Engineer`
                    }
                />
            </div>
        </div>  
    );

};

export default Team;
