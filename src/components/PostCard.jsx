import { useState } from "react";
import { Link } from "react-router-dom";
import { getImage } from "@utils/getImage";
import { useAuth } from "@hooks/useAuth";
import { formatDate } from "@utils/general";
import truncateText from "@utils/truncateText";

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
}) {
  const { auth } = useAuth();
  const [actionHidden, setActionHidden] = useState(true);

  const toggleActionMenu = () => {
    setActionHidden(!actionHidden);
  };
  console.log(id);
  return (
    <div className="blog-card">
      <Link to={`/blog/${id}`}>
        <img
          className="blog-thumb"
          src={getImage(image, "blog")}
          alt={`${title}_thumbnail`}
        />
      </Link>
      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl">
          <Link to={`/blog/${id}`}>{title}</Link>
        </h3>

        <p className="mb-6 text-base text-slate-500 mt-1">
          {truncateText(content, 160)}
        </p>

        {/* Meta Informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <AvatarImage name={authorName} avatar={avatar} />
            <div>
              <h5 className="text-slate-500 text-sm">
                <Link to={`user/${authorId}/profile`}>{authorName}</Link>
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
            {actionHidden ? null : <ActionMenu />}
          </div>
        )}
        {/* action dot */}

        {/* action dot ends */}
      </div>
    </div>
  );
}
