import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { onChildAdded, ref } from "firebase/database";
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
    onChildAdded(commentListRef, (data) => {
      setComments((prevComments) => {
        return [...prevComments, { ...data.val() }];
      });
    });
  }, []);
  return (
    <div>
      {comments.map((comment, idx) => {
        return <Comment key={idx} comment={comment} />;
      })}
    </div>
  );
};

export default CommentSection;
