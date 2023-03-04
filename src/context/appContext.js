import { useState, useReducer, useContext } from "react";

import React from "react";
import ReactDOM from "react-dom/client";
// Create context
const AppContext = React.createContext();

// State values

const test = () => {
  console.log("hello world");
};
// Create Provider
const AppProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({});
  return (
    <AppContext.Provider value={{ setAuthDetails }}>
      {children}
    </AppContext.Provider>
  );
};

// Exports

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
