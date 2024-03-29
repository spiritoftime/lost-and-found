import capitalize from "../../helper functions/capitalizeWord";
import React, { useState } from "react";
import PurpleButton from "../../components/PurpleButton";
import { useAppContext } from "../../context/appContext";
import { database } from "../../firebase";
import {
  push,
  get,
  ref,
  set,
  serverTimestamp,
  update,
} from "firebase/database";
import emptyAvatar from "../../images/empty-avatar.png";
import setParentComment from "./setParentComment";

// sample comment data
// const commentDocument = {
//   commentBody: comment,
//   replies: [],
//   commentedAt: serverTimestamp(),
//   commentedBy: authDetails.username,
// };

const DB_COMMENT_KEY = "comments";
const ReplyInput = ({ username, parentCommentKey, parentCommentUsername }) => {
  const { report, setReport, authDetails } = useAppContext();
  const [reply, setReply] = useState("");
  if (!username)
    return ;
  return (
    <div className="mx-2 md:mx-4">
      {username && (
        <p className="text-xs">
          Comment as{" "}
          <span className="text-blue-300">{capitalize(username)}</span>{" "}
        </p>
      )}
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-full border-2 border-gray-300"
        placeholder="What are your thoughts?"
        type="text"
      />
      <PurpleButton
        handleSubmit={(e) => {
          const parentCommentRef = ref(
            database,
            `${DB_COMMENT_KEY}/${report.reportId}/${parentCommentKey}`
          );
          const commentKey = push(parentCommentRef).key;
          const commentRef = ref(
            database,
            `${DB_COMMENT_KEY}/${report.reportId}/${commentKey}`
          );
          const updates = {};
          if (reply.trim() === "") return;
          const commentDocument = {
            commentBody: `@${parentCommentUsername} ` + reply,
            replies: [],
            commentedAt: serverTimestamp(),
            commentedBy: authDetails.username,
            commenterProfile: emptyAvatar && authDetails.profileUrl,
            parent: parentCommentRef.key,
            commentId: commentKey,
          };
          set(commentRef, commentDocument);
          setParentComment(parentCommentRef, commentKey);

          setReply("");
        }}
        label={"Comment"}
      />
    </div>
  );
};

export default ReplyInput;
