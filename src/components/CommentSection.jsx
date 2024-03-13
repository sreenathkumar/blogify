import { useAuth } from "@hooks/useAuth";
import { useAxios } from "@hooks/useAxios";
import { notify } from "@utils/general";
import queryClient from "@utils/queryClient";
import { useState } from "react";
import AvatarImage from "./AvatarImage";
import FloatingActions from "./FloatingActions";
import SingleComment from "./SingleComment";

const CommentSection = ({ comments, blogId, blogTitle, likes }) => {
  const { auth } = useAuth();

  //modifided api
  const api = useAxios();

  //all states
  const [allComments, setAllComments] = useState(comments); //state to hold all comments
  const [comment, setComment] = useState(""); //state to hold the comment
  const [error, setError] = useState(null); //state to hold the error message

  const avatar = auth?.user?.avatar;
  const authorName = `${auth?.user?.firstName} ${auth?.user?.lastName}`;

  //handle comment submission
  const handleComment = async (e) => {
    e.preventDefault();
    // check if logged in
    if (auth?.accessToken) {
      // check if comment is not empty
      if (comment.trim() === "") {
        setError("Comment cannot be empty");
        return;
      }

      // send comment to server
      try {
        const response = await api.post(`/blogs/${blogId}/comment`, {
          content: comment,
        });
        if (response.status === 200) {
          setComment(""); //clear the comment field
          setAllComments(response.data.comments); //update the comments
          queryClient.invalidateQueries(["All", blogId]); //invalidate the cache
          notify("Comment added", "success");
        }
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("You need to login to comment");
    }
  };

  //hadle comment deletion
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmed) return;
    try {
      const response = await api.delete(`/blogs/${blogId}/comment/${id}`);
      if (response.status === 200) {
        setAllComments(response.data.comments);
        queryClient.invalidateQueries(["All", blogId]); //invalidate the cache
        notify("Comment deleted", "success");
      }
    } catch (err) {
      notify("Error deleting comment. Try agin!", "error");
    }
  };

  return (
    <>
      <section id="comments">
        <div className="mx-auto w-full md:w-10/12 container">
          <h2 className="text-3xl font-bold my-8">
            Comments ({allComments?.length})
          </h2>
          <div className="flex space-x-4">
            {auth?.accessToken ? (
              <AvatarImage name={authorName || "Author Name"} avatar={avatar} />
            ) : (
              <AvatarImage name={"Author Name"} />
            )}
            <div className="w-full">
              <textarea
                className={`w-full bg-[#030317] border ${
                  error ? "border-red-500" : "border-slate-500"
                } text-slate-300 p-4 rounded-md focus:outline-none`}
                placeholder="Write a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setError(null);
                }}
              ></textarea>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleComment}
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comment One */}
          {allComments?.map((comment) => (
            <SingleComment
              key={comment.id}
              commentId={comment.id}
              content={comment.content}
              date={comment.createdAt}
              author={comment.author}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </section>
      <FloatingActions
        numberOfComments={allComments?.length}
        numberOfLikes={likes?.length}
        blogId={blogId}
        blogTitle={blogTitle}
        likes={likes}
      />
    </>
  );
};

export default CommentSection;
