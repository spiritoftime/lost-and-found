import { useState, useEffect,useReducer, useContext } from "react";
import { database,storage } from '../firebase';
import { onChildAdded, push, ref, set } from 'firebase/database'
import React from "react";
import ReactDOM from "react-dom/client";
// Create context
const AppContext = React.createContext();



// State values  
const initialState = {  
  allReports:[],
  filteredReports:[],
  reportType:"all",
  gender:"all",
  category:"all",
} 



 
 
// Create Provider
const AppProvider = ({ children }) => {
  const [values, setValues] = useState(initialState)

  //handleChange
  

   //handleSubmit
   
 

 
  const [authDetails, setAuthDetails] = useState({});
  return (
    <AppContext.Provider value={{ authDetails, setAuthDetails,values ,setValues}}>
      {children}
    </AppContext.Provider>
  );
};

// Exports

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
