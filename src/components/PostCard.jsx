import { useAuth } from "@hooks/useAuth";
import { formatDate } from "@utils/general";
import { getImage } from "@utils/getImage";
import truncateText from "@utils/truncateText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components & Icons
import threeDots from "@icons/3dots.svg"; //three dots icon
import ActionMenu from "./ActionMenu";
import AvatarImage from "./AvatarImage";

export default function PostCard({
  id,
  title,
  content,
  image,
  authorName,
  avatar,
  authorId,
  date,
  likes,
  onDelete,
}) {
  const { auth } = useAuth();
  const [actionHidden, setActionHidden] = useState(true);
  const navigate = useNavigate();

  const toggleActionMenu = (e) => {
    e.stopPropagation();
    setActionHidden(!actionHidden);
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        navigate(`/blog/${id}`);
      }}
      className="blog-card"
    >
      <img
        className="blog-thumb"
        src={getImage(image, "blog")}
        alt={`${title}_thumbnail`}
      />

      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl">{title}</h3>

        <p className="mb-6 text-base text-slate-500 mt-1">
          {truncateText(content, 160)}
        </p>

        {/* Meta Informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <AvatarImage name={authorName} avatar={avatar} />
            <div>
              <h5
                className="text-slate-500 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user/${authorId}/profile`);
                }}
              >
                {authorName}
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{formatDate(date)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{likes} Likes</span>
          </div>
        </div>
        {auth?.user?.id === authorId && (
          <div className="absolute right-0 top-0">
            <button onClick={toggleActionMenu}>
              <img src={threeDots} alt="3dots of Action" />
            </button>

            {/* Action Menus Popup */}
            {actionHidden ? null : <ActionMenu id={id} onDelete={onDelete} />}
          </div>
        )}
      </div>
    </div>
  );
}
