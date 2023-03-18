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

const DB_REPORT_KEY = "report";
const reportRef = ref(database, DB_REPORT_KEY);

const Feed = () => {
  const { values, setValues, setReport } = useAppContext();
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  useEffect(() => {
    setValues((report) => {
      return {
        ...report,
        allReports: [],
      };
    });
    onChildAdded(reportRef, (data) => {
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
  }, []);

  // console.log(values.allReports)

  return (
    <>
      <div className="grid grid-cols-5 ">
        {/*- Filter Nav*/}
        <div className="  col-span-1   p-5 border-black">
          <Sort />
        </div>

        {/*- REPORT GRID*/}

        <div className=" col-span-4 p-5">
          <div class=" bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
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
          <text className="ml-5">
            {values.filteredReports.length} reports found{" "}
          </text>
          <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          {values.filteredReports.length === 0 ? (
            <div className="mt-5">No Results...</div>
          ) : (
            <div>
              <div
                className={
                  view === "list"
                    ? "grid grid-cols-1 gap-5"
                    : "grid grid-cols-4 gap-5"
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
