import React, { useEffect, useRef, useState } from "react";
import NavRoutes from "./NavRoutes";
import { useQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import DashHeader from "./DashboardComponents/Header/DashHeader";
import {ME_QUERY} from "./components/Home/queries/meQuery";
import {UserContextProvider} from "./providers/User/UserProvider";
import {StripeContextProvider} from "./providers/Stripe/StripeProvider";
import {getPaymentIntent} from "./components/Payment/utils/stripeUtil";

export const stripePromise = loadStripe("pk_test_51KuQTfEENlNwB06RZQuBJQLZFFiIaTBeCSTBLrZmgrueQB6pkzIxNaoZGgOZm2DohTbcimKQLyiZctCGUJn55f7x00hnUqMpwT");

const App = () => {
  const bannerRef = useRef(null);
  const videoRef = useRef(null);
  const aboutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(ME_QUERY, {
    fetchPolicy: 'network-only'
  });
  if (error) console.log("failed to fetch me data");

  const [user, setUser] = useState(false);
  const updateUser = (userData) => setUser(userData);

  useEffect(() => {
    if (!loading && !error) {
      setUser(data.me.meData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    const errorCodes = [400, 401, 500];

    if (!loading || error) {
      const errorCodeStatus = errorCodes.find(ele => ele === data.me.code);
      if (errorCodeStatus) navigate("/snarki/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
      <StripeContextProvider value={{
        getPaymentIntent,
        stripe: stripePromise
      }}>
        <div className="App">
          {
            user && location.pathname.includes("/dashboard") ?
              <DashHeader /> :
              <Header navbarRefs={navbarRefs} />
          }

          <NavRoutes propRef={{bannerRef, videoRef, aboutRef}} />
        </div>
      </StripeContextProvider>
    </UserContextProvider>
  );
}

export default App;