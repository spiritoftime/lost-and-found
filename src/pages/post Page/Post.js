import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "@mui/material";
import React from "react";
import { useAppContext } from "../../context/appContext";
import getDateDiff from "../../helper functions/convertTimestamp";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import Tag from "./Tag";
const Post = () => {
  const { report, setReport, authDetails } = useAppContext();

  return (
    <div className="pt-12 min-h-screen bg-[#868e96] ">
      <div className="mx-12 bg-white flex flex-col gap-4 mt-4 border-white rounded-md border-2">
        <p className="text-[#868e96] text-xs">
          Posted by {report.username} {getDateDiff(report.createdAt)}
        </p>
        <div className="flex">
          <img className="w-4/12" src={report.imageURL} />
          <div>
            <h2 className="text-2xl font-bold">{capitalize(report.petName)}</h2>
            <ul>
              <Tag reportType={report.reportType} />
              <li>
                {capitalize(report.gender)}{" "}
                <FontAwesomeIcon
                  icon={report.gender === "male" ? faMars : faVenus}
                />
              </li>

              <li>Last Seen: {report.lastSeen}</li>
              <li>Responds to: {report.respondsTo}</li>
              <li>Microchip Number: {report.microChipNumber}</li>
              {report.reportType === "missing" ? (
                <li>If found, please contact {report.contactNumber}</li>
              ) : (
                <li>Spotter's contact Number: {report.contactNumber}</li>
              )}
              <li>{report.description}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
