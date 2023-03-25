import React, { useState } from "react";
import CommentHeader from "./CommentHeader";
import { useAppContext } from "../../context/appContext";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoundButton from "../../components/RoundButton";
import ReplyInput from "./ReplyInput";
const DB_COMMENT_KEY = "comments";
const Comment = ({ comment = "", parentCommentKey,parentCommentUsername }) => {
  const { authDetails, report } = useAppContext();
  const [showTextArea, setShowTextArea] = useState(false);
  return (
    <div className=" px-4 flex flex-col">
      {<CommentHeader comment={comment} />}
      <p className="pl-[38px]">{comment.commentBody}</p>
      <div
        className="pl-[38px] cursor-pointer"
        onClick={() => setShowTextArea(true)}
      >
        Reply <FontAwesomeIcon className="text-gray-700" icon={faComment} />
        {showTextArea && (
          <ReplyInput
            parentCommentKey={comment.commentId}
            parentCommentUsername={parentCommentUsername}
            username={authDetails.username}
          />
        )}
      </div>
      {/* {comment.replies &&
        comment.replies.map((reply) => (
          <Comment key={reply} parentCommentKey={comment.commentId} />
        ))} */}
    </div>
  );
};

export default Comment;
