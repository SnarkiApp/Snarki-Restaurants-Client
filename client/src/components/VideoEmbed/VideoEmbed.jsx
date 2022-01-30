import React from "react";
import ReactPlayer from 'react-player/lazy'
import "./VideoEmbed.css";

const VideoEmbed = ({propRef}) => (
    <div className="videoEmbed" ref={propRef}>
        <div className="videoEmbed-title">How it Works</div>
        <div className="video-responsive">
            <ReactPlayer
                controls
                width="100%"
                height="400px"
                url="https://www.youtube.com/watch?v=jZJcUjH6tU8"
            />
        </div>
    </div>
);

export default VideoEmbed;
