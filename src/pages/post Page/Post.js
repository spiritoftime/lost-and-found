import { useAppContext } from "../../context/appContext";
import CommentInput from "./CommentInput";
import CommentSection from "./CommentSection";
import PostDetails from "./PostDetails";

const Post = () => {
  const { report, setReport, authDetails, comments, setComments } =
    useAppContext();
  console.log(report, "post report details");
  return (
    <div className="pt-6 pb-6 min-h-screen bg-slate-200 ">
      <div className="mx-3 md:mx-12 bg-white flex flex-col gap-4 mt-4 border-white rounded-md border-2">
        <PostDetails report={report} />
        <CommentInput username={authDetails.username} />
        <CommentSection />
      </div>
    </div>
  );
};

export default Post;
