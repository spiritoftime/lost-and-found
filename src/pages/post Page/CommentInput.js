import capitalize from "../../helper functions/capitalizeWord";
import React, { useState } from "react";
import PurpleButton from "../../components/PurpleButton";
import { useAppContext } from "../../context/appContext";
import { database } from "../../firebase";
import { push, ref, set, serverTimestamp } from "firebase/database";
import emptyAvatar from "../../images/empty-avatar.png";

const DB_COMMENT_KEY = "comments";
const CommentInput = ({ username }) => {
  const { report, setReport, authDetails } = useAppContext();
  const [comment, setComment] = useState("");
  if (!username)
    return (
      <p className="text-xs mx-4">
        Please{" "}
        <a href="login" className="text-xs text-indigo-500">
          login
        </a>{" "}
        to comment!
      </p>
    );

  return (
    <div className="mx-4">
      {username && (
        <p className="text-xs">
          Comment as{" "}
          <span className="text-blue-300">{capitalize(username)}</span>{" "}
        </p>
      )}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border-2 border-gray-300"
        placeholder="What are your thoughts?"
        type="text"
      />
      <PurpleButton
        handleSubmit={(e) => {
          const commentListRef = push(
            ref(database, `${DB_COMMENT_KEY}/${report.reportId}`)
          );
          if (comment.trim() === "") return;
          const commentDocument = {
            commentBody: comment,
            replies: [],
            commentedAt: serverTimestamp(),
            commentedBy: authDetails.username,
            commenterProfile: emptyAvatar && authDetails.profileUrl,
            parent: null,
            commentId: commentListRef.key,
          };
          set(commentListRef, commentDocument);
          setComment("");
        }}
        label={"Comment"}
      />
    </div>
  );
};

export default CommentInput;
