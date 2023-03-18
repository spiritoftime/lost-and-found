import React, { useState } from "react";
import CommentHeader from "./CommentHeader";
import CommentInput from "./CommentInput";
import { useAppContext } from "../../context/appContext";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoundButton from "../../components/RoundButton";
const Comment = ({ comment }) => {
  const { authDetails } = useAppContext();
  const [showTextArea, setShowTextArea] = useState(false);
  return (
    <div className=" px-4 flex flex-col">
      {<CommentHeader comment={comment} />}
      <p className="pl-[32px]">{comment.commentBody}</p>
      <div className="pl-[32px]" onClick={() => setShowTextArea(true)}>
        Reply <FontAwesomeIcon className="text-gray-700" icon={faComment} />
        {showTextArea && <CommentInput username={authDetails.username} />}
      </div>
    </div>
  );
};

export default Comment;
