import { useAuth } from "@hooks/useAuth";
import AvatarImage from "./AvatarImage";
import deleteIcon from "@assets/icons/delete.svg";
import { Link } from "react-router-dom";

export default function SingleComment({
  author,
  content,
  onDelete,
  commentId,
}) {
  const { auth } = useAuth();
  const { firstName, lastName, avatar, id } = author || {};
  const authorName = `${firstName} ${lastName}`;

  return (
    <div className="flex items-start space-x-4 my-8">
      <AvatarImage name={authorName} avatar={avatar} />
      <div className="w-full ">
        <h5 className="text-slate-500 font-bold">
          <Link to={`/user/${id}/profile`}>{authorName || "Author Name"}</Link>
        </h5>
        <p className="text-slate-300">{content || "Comment Content"}</p>
        {
          //delete button
          auth?.user?.id === id && (
            <button
              onClick={() => onDelete(commentId)}
              className="flex items-center gap-2 text-sm text-red-500"
            >
              <img
                src={deleteIcon}
                className="mt-4 hover:text-red-500 transition-colors"
                alt="Delete"
              />
            </button>
          )
        }
      </div>
    </div>
  );
}
