import { capitalize } from "@mui/material";
import React, { useState } from "react";
import PurpleButton from "../../components/PurpleButton";
import { useAppContext } from "../../context/appContext";
import { database } from "../../firebase";
import { push, ref, set, serverTimestamp } from "firebase/database";
import emptyAvatar from "../../images/empty-avatar.png";

// sample comment data
// const commentDocument = {
//   commentBody: comment,
//   replies: [],
//   commentedAt: serverTimestamp(),
//   commentedBy: authDetails.username,
// };

const DB_COMMENT_KEY = "comments";
const ReplyInput = ({ username }) => {
  const { report, setReport, authDetails, setComments, comments } =
    useAppContext();
  const [reply, setReply] = useState("");

  return (
    <div className="mx-4">
      <p className="text-xs">
        Comment as <span className="text-blue-300">{capitalize(username)}</span>{" "}
      </p>
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-full  border-2 border-gray-300"
        placeholder="What are your thoughts?"
        type="text"
      />
      <PurpleButton
        handleSubmit={(e) => {
          const commentListRef = push(
            ref(database, `${DB_COMMENT_KEY}/${report.reportId}`)
          );
          if (reply.trim() === "") return;
          const commentDocument = {
            commentBody: reply,
            replies: [],
            commentedAt: serverTimestamp(),
            commentedBy: authDetails.username,
            commenterProfile: authDetails.profileUrl && emptyAvatar,
          };
          setComments([...comments, commentDocument]);
          set(commentListRef, commentDocument);
          setReply("");
        }}
        label={"Comment"}
      />
    </div>
  );
};

export default ReplyInput;