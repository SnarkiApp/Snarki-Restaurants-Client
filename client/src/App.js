import React, { useRef } from "react";
import NavRoutes from "./NavRoutes";
import Header from "./components/Header/Header";

const App = () => {
  const bannerRef = useRef(null);
  const videoRef = useRef(null);
  const aboutRef = useRef(null);

  const navbarRefs = [
      bannerRef,
      videoRef,
      aboutRef
  ];

  return (
    <div className="App">
      <Header navbarRefs={navbarRefs} />
      <NavRoutes propRef={{bannerRef, videoRef, aboutRef}} />
    </div>
  );
}

export default App;