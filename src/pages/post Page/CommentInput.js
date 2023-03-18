import { capitalize } from "@mui/material";
import React from "react";
import PurpleButton from "../../components/PurpleButton";
const CommentInput = ({ username }) => {
  return (
    <div className="mx-4">
      <p className="text-xs">
        Comment as <span className="text-blue-300">{capitalize(username)}</span>{" "}
      </p>
      <textarea
        className="w-full  border-2 border-gray-300"
        placeholder="What are your thoughts?"
        type="text"
      />
      <PurpleButton label={"Comment"} />
    </div>
  );
};

export default CommentInput;
