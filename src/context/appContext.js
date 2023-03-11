import { useState, useEffect,useReducer, useContext } from "react";
import { database,storage } from '../firebase';
import { onChildAdded, push, ref, set } from 'firebase/database'
import React from "react";
import ReactDOM from "react-dom/client";
// Create context
const AppContext = React.createContext();







 
 
// Create Provider
const AppProvider = ({ children }) => {
  // State values  
  const initialState = {  
   
  allReports:[],
  filteredReports:[],
  reportType:"all",
  gender:"all",
  category:"all",
  }     
  const [values, setValues] = useState(initialState)
  const [authDetails, setAuthDetails] = useState({});


  //handleChange
  

   //handleSubmit
   
 

 
  
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
