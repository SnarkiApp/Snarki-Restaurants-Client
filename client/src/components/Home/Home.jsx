import React from "react";
import Banner from "../Banner/Banner";
import VideoEmbed from "../VideoEmbed/VideoEmbed";
import AboutUs from "../AboutUs/AboutUs";
import Footer from "../Footer/Footer";

const Home = ({propRef}) => {

    return (
        <>
            <Banner propRef={propRef.bannerRef} />
            <VideoEmbed propRef={propRef.videoRef} />
            <AboutUs propRef={propRef.aboutRef} />
            <Footer />
        </>
    );
};

export default Home;
