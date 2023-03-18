import { capitalize } from "@mui/material";
import React from "react";

const Tag = ({ reportType }) => {
  if (reportType === "missing")
    return (
      <div className="bg-red-700 rounded-md w-fit px-2">
        <p className="text-white">{capitalize(reportType)}</p>
      </div>
    );
};

export default Tag;
