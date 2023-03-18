import React from "react";
import { useAppContext } from "../../context/appContext";
import CommentInput from "./CommentInput";
import PostDetails from "./PostDetails";

const Post = () => {
  const { report, setReport, authDetails } = useAppContext();

  return (
    <div className="pt-12 min-h-screen bg-[#868e96] ">
      <div className="mx-12 bg-white flex flex-col gap-4 mt-4 border-white rounded-md border-2">
        <PostDetails report={report} />
        <CommentInput username={authDetails.username} />
      </div>
    </div>
  );
};

export default Post;
