import React, {createContext} from "react";

export const StripeContext = createContext({});

export const StripeContextProvider = ({value, children}) => (
    <StripeContext.Provider value={value}>
        {children}
    </StripeContext.Provider>
);
