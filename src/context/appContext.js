import { useState, useEffect, useReducer, useContext } from "react";
import { database, storage } from "../firebase";
import { onChildAdded, push, ref, set } from "firebase/database";
import React from "react";
import ReactDOM from "react-dom/client";
// Create context
const AppContext = React.createContext();

const uid = localStorage.getItem("uid");
// const username = localStorage.getItem('username')

// Create Provider
const AppProvider = ({ children }) => {
  // State values
  const initialState = {
    allReports: [],
    filteredReports: [],
    userReports: [],

    //filters (not the report)
    reportType: "all",
    gender: "all",
    category: "all",
    uid_temp: uid ? uid : null,
  };

  const reportData = {
    uid: "",
    username: "",
    reportType: "all",
    petName: "",
    respondsTo: "",
    gender: "",
    category: "",
    lastSeen: "",
    contactNumber: "",
    microChipNumber: "",
    description: "",
    imageURL: "",
    isEditing: false,
  };
  const [values, setValues] = useState(initialState);
  const [authDetails, setAuthDetails] = useState({});
  const [report, setReport] = useState(reportData);
  const [comments, setComments] = useState([]);

  //handleChange

  //handleSubmit

  return (
    <AppContext.Provider
      value={{
        authDetails,
        setAuthDetails,
        report,
        setReport,
        values,
        setValues,
        comments,
        setComments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Exports

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
