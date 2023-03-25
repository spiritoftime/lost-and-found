import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import petImage from "../../images/petImage.jpeg";

import {
  onChildAdded,
  push,
  ref,
  set,
  update,
  collection,
  remove,
} from "firebase/database";

import { database } from "../../firebase";

const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

const deleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const MyReport = () => {
  const { report, setReport, authDetails } = useAppContext();
  const navigate = useNavigate();
  const userReport = [];

  const editReport = (reportData) => {
    setReport({ ...reportData, isEditing: true });
  };

  const { setValues, values } = useAppContext();
  useEffect(() => {
    setValues({
      ...values,
      userReports: [
        ...values.allReports.filter((report) => report.uid === authDetails.uid),
      ],
    });
  }, []);

  //delete function

  const deleteReport = (id) => {
    const reportRef = ref(database, `report/${id}`);
    remove(reportRef);
    setValues({
      ...values,
      userReports: [
        ...values.userReports.filter((report) => report.reportId !== id),
      ],
    });
  };

  return (
    <>
      <div className="p-10 min-h-screen">
        <h5 className="text-xl pb-5 font-medium">My Reports</h5>
        <div className="grid grid-cols-4 gap-5">
          {values.userReports &&
            values.userReports.map((report, index) => {
              return (
                <div
                  key={index}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="p-2">Reported by: {report.username}</div>
                  <a href="#">
                    <img
                      onClick={() => navigate("/post")}
                      className="w-full object-cover aspect-[5/3]"
                      src={report.imageURL}
                      alt={`poster's lovely pet`}
                    />
                  </a>
                  <div
                    className={`p-2 tracking-wide text-center uppercase text-lg font-bold ${
                      report.reportType === "missing"
                        ? "bg-red-100 text-red-400"
                        : "bg-green-100 text-green-600"
                    } `}
                  >
                    {report.reportType}
                  </div>
                  <div className="p-5">
                    <div className="mb-5">
                      {report.reportType === "missing" && (
                        <div>Name: {report.petName}</div>
                      )}
                      <div>Gender: {report.gender}</div>
                      <div>Category: {report.category}</div>
                      <div>Last seen: {report.lastSeen}</div>
                      <div>Contact no.: {report.contactNumber}</div>
                      <div>Microchip no.: {report.microChipNumber}</div>
                    </div>
                    <button
                      onClick={() => editReport(report)}
                      className="mr-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <Link
                        to={
                          report.reportType === "missing"
                            ? "/missing"
                            : "/spotted"
                        }
                      >
                        <span className="mr-2">Edit</span>
                        {editIcon}
                      </Link>
                    </button>

                    <button
                      onClick={() => deleteReport(report.reportId)}
                      className="mr-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <span className="mr-2">Resolve</span>
                      {deleteIcon}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MyReport;
