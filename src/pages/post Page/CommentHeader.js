import { capitalize } from "@mui/material";
import React from "react";
import getDateDiff from "../../helper functions/convertTimestamp";
const CommentHeader = ({ comment }) => {
  return (
    <div className="flex gap-2 items-center">
      <img
        alt=""
        className="w-[30px] rounded-lg aspect-square"
        src={comment.commenterProfile}
      />
      <p className="text-xs md:text-base">
        {capitalize(comment.commentedBy)} · {getDateDiff(comment.commentedAt)}
      </p>
    </div>
  );
};

export default CommentHeader;
