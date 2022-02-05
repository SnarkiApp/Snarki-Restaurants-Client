import React, { useEffect, useRef, useState } from "react";
import NavRoutes from "./NavRoutes";
import { useQuery } from "@apollo/client";
import Header from "./components/Header/Header";
import {ME_QUERY} from "./components/Home/queries/meQuery";
import {UserContextProvider} from "./providers/User/UserProvider";

const App = () => {
  const bannerRef = useRef(null);
  const videoRef = useRef(null);
  const aboutRef = useRef(null);
  const [user, setUser] = useState(null);
  const { loading, error, data } = useQuery(ME_QUERY, {
    fetchPolicy: 'network-only'
  });

  if (error) console.log("failed to fetch me data");

  const updateUser = (userData) => setUser(userData);

  useEffect(() => {
    if (!loading && !error) {
      setUser(data.me.meData);
    }
  }, [loading]);

  const navbarRefs = [
      bannerRef,
      videoRef,
      aboutRef
  ];

  return (
    <UserContextProvider value={{
      user,
      updateUser
    }}>
      <div className="App">
        <Header navbarRefs={navbarRefs} />
        <NavRoutes propRef={{bannerRef, videoRef, aboutRef}} />
      </div>
    </UserContextProvider>
  );
}

export default App;