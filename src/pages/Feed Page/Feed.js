import React, { useState, useEffect } from "react";
import { database, storage } from "../../firebase";
import {
  onChildAdded,
  onChildRemoved,
  push,
  ref,
  set,
} from "firebase/database";
import petImage from "../../images/petImage.jpeg";
import NavBar from "../../components/NavBar";
import Sort from "../../components/Sort";
import { useAppContext } from "../../context/appContext";
import Card from "../../components/Card";
import ListItem from "../../components/ListItem";
//DB stuff
import { useNavigate } from "react-router-dom";
import PurpleButton from "../../components/PurpleButton";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute'  ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DB_REPORT_KEY = "report";
const reportRef = ref(database, DB_REPORT_KEY);
const Feed = () => {
  const { values, setValues, setReport } = useAppContext();
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setValues((report) => {
      return {
        ...report,
        allReports: [],
      };
    });
    const cb = onChildAdded(reportRef, (data) => {
      setValues((report) => {
        return {
          ...report,
          allReports: [
            ...report.allReports,
            { ...data.val(), reportId: data.ref._path.pieces_[1] },
          ],
        };
      });
      console.log(data.ref._path.pieces_[1]);
    });
    return () => cb();
  }, []);
  // console.log(values.allReports)
  return (
    <>
    <div className="md:hidden flex justify-center p-5 bg-slate-200">
    <button
        type="submit"
        className="w-3/6 h-10 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={handleOpen}
     >
                    Filter
     </button>
 


    </div>
      <div className="grid gap-0 grid-rows-1  md:grid-cols-5 min-h-screen bg-slate-200">
        {/*- Filter Nav*/}
        <div className="  hidden md:block col-span-1    p-5 ">
          <Sort />
        </div>
        {/*- REPORT GRID*/}
     


        
   
      

         

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center "
        
      >
        <div className="w-5/6 self-center">   <Sort/></div>
    
      </Modal>
    
 

        


      
        <div className="   xs:col-span-5 md:col-span-4  p-5  ">
          <div class=" bg-slate-400 text-sm text-gray-500 leading-none   rounded-full inline-flex">
            <button
              onClick={() => setView("grid")}
              className={
                view === "grid"
                  ? " rounded-full  inline-flex items-center px-4 py-2 bg-white text-blue-400 "
                  : " rounded-full inline-flex items-center transition-colors duration-100 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 px-4 py-2"
              }
              id="grid"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="fill-current w-4 h-4 mr-2"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={
                view === "list"
                  ? " rounded-full  inline-flex items-center px-4 py-2 bg-white text-blue-400 "
                  : "rounded-full inline-flex items-center transition-colors duration-100 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 px-4 py-2"
              }
              id="list"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="fill-current w-4 h-4 mr-2"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              <span>List</span>
            </button>
          </div>
         
          <text className="ml-5 text-xs">
            {values.filteredReports.length} reports found{" "}
          </text>
          <hr class="h-px my-5 bg-gray-200   dark:bg-gray-700"></hr>
          {values.filteredReports.length === 0 ? (
            <div className="mt-5   ">No Results...</div>
          ) : (
            <div className=" ">
              <div
                className={
                  view === "list"
                    ? "grid grid-cols-1 gap-5 "
                    : "grid xs:grid-cols-1 md:grid-cols-4 gap-5"
                }
              >
                {values.filteredReports &&
                  values.filteredReports.map((report, index) => {
                    return view === "list" ? (
                      <ListItem key={index} report={report} />
                    ) : (
                      <Card key={index} report={report}></Card>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Feed;
