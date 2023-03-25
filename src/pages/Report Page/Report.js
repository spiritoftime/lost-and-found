import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/Form";
import { useAppContext } from "../../context/appContext";
import useIsEditing from "../../custom hooks/useIsEditing";
import { database } from "../../firebase";
import lostPet from "../../images/lost-cat.png";
import spottedPet from "../../images/spotted-cat.png";

const Report = () => {
  useIsEditing();
  // const [reportType,setReportType]= useState("")
  const { report, setReport } = useAppContext();

  return (
    <>
      <div className="w-screen min-h-screen bg-slate-400 flex justify-center">
        {/*Display report options if !reportType*/}

        <div className="flex flex-col justify-center content-center flex-wrap  w-5/6  ">
          {/*Title*/}
          <div className='mb-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"'>
            I would like to make a ...{" "}
          </div>

          <div className="flex flex-row gap-5 ">
            {/*Missing Card*/}
            <Link
              to="/missing"
              onClick={() => setReport({ ...report, reportType: "missing" })}
              className="block max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <img src={lostPet} className="object-scale-down h-48 w-96 "></img>
              <h5 className="mb-2  mt-5 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Missing Report
              </h5>
            </Link>

            {/*Spotted Card*/}
            <Link
              to="/spotted"
              onClick={() => setReport({ ...report, reportType: "spotted" })}
              className="block max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <img
                src={spottedPet}
                className="object-scale-down h-48 w-96 "
              ></img>
              <h5 className="mb-2 mt-5 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Spotted Report
              </h5>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
