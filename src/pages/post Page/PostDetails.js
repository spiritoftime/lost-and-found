import React from "react";
import getDateDiff from "../../helper functions/convertTimestamp";
import {
  faMars,
  faVenus,
  faLocationDot,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "@mui/material";
const PostDetails = ({ report }) => {
  return (
    <div className="mx-4">
      <p className="text-[#868e96] text-xs">
        Posted by {report.username} {getDateDiff(report.createdAt)}
      </p>
      <div className="flex">
        <img alt="" className="w-3/12" src={report.imageURL} />
        <div>
          {report.reportType === "missing" && (
            <h2 className="text-2xl font-bold">{capitalize(report.petName)}</h2>
          )}
          <ul>
            <Tag reportType={report.reportType} />
            <li>
              {capitalize(report.gender)}{" "}
              <FontAwesomeIcon
                className={
                  report.gender === "male" ? "text-blue-600" : "text-pink-500"
                }
                icon={report.gender === "male" ? faMars : faVenus}
              />
            </li>

            <li>
              Last Seen{" "}
              {<FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>}:{" "}
              {report.lastSeen}
            </li>
            <li>Responds to: {report.respondsTo}</li>
            <li>
              Microchip Number{" "}
              {
                <FontAwesomeIcon
                  className={"text-blue-500"}
                  icon={faMicrochip}
                />
              }{" "}
              : {report.microChipNumber}
            </li>
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
  );
};

export default PostDetails;
