import React from "react";
import { database } from "../../firebase";
import { get, set } from "firebase/database";
const DB_COMMENT_KEY = "comments";
const setParentComment = (parentCommentRef, commentId) => {
  get(parentCommentRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const parentDocument = snapshot.val();
        let newDocument = parentDocument;
        if (newDocument.replies) newDocument.replies.push(commentId);
        else newDocument.replies = [commentId];
        set(parentCommentRef, newDocument);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default setParentComment;
