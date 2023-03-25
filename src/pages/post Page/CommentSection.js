import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { onChildAdded, ref, on } from "firebase/database";
import emptyAvatar from "../../images/empty-avatar.png";

import { database } from "../../firebase";
import getDateDiff from "../../helper functions/convertTimestamp";
import CommentHeader from "./CommentHeader";
import Comment from "./Comment";
const DB_COMMENT_KEY = "comments";
const CommentSection = () => {
  const { comments, setComments, authDetails, report } = useAppContext();
  const commentListRef = ref(database, `${DB_COMMENT_KEY}/${report.reportId}`);
  useEffect(() => {
    setComments([]);
    const cb = onChildAdded(commentListRef, (data) => {
      setComments((prevComments) => {
        return [...prevComments, { ...data.val() }];
      });
    });
    return () => cb();
  }, []);
  return (
    <div className="flex flex-col gap-4 mb-2">
      {comments.map((comment, idx) => {
        return (
          <Comment
            key={idx}
            parentCommentUsername={comment.commentedBy}
            parentCommentKey={comment.commentId}
            comment={comment}
          />
        );
      })}
    </div>
  );
};

export default CommentSection;
