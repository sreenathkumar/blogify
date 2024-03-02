import threeDots from "@icons/3dots.svg";
import truncateText from "@utils/truncateText";
import { useState } from "react";
import ActionMenu from "./ActionMenu";
import AvatarImage from "./AvatarImage";

export default function PostCard({title, content, image, author, date, likes}) {
  const [actionHidden, setActionHidden] = useState(true);

  const toggleActionMenu = () => {
    setActionHidden(!actionHidden);
  }

  return (
    <div className="blog-card">
      <img
        className="blog-thumb"
        src={`http://localhost:3000/uploads/blog/${image}` || "http://via.placeholder.com/300x200"}
        alt=""
      />
      <div className="mt-2 relative">
        <a href="./single-blog.html">
          <h3 className="text-slate-300 text-xl lg:text-2xl">
            <a href="./single-blog.html">{title}</a>
          </h3>
        </a>
        <p className="mb-6 text-base text-slate-500 mt-1">
          {truncateText(content, 200)}
        </p>

        {/* Meta Informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <AvatarImage name={author}/>
            <div>
              <h5 className="text-slate-500 text-sm">
                <a href="./profile.html">{author}</a>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{date}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{likes} Likes</span>
          </div>
        </div>

        {/* action dot */}
        <div className="absolute right-0 top-0">
          <button onClick={toggleActionMenu}>
            <img src={threeDots} alt="3dots of Action" />
          </button>

          {/* Action Menus Popup */}
          {actionHidden ? null : <ActionMenu />}
        </div>
        {/* action dot ends */}
      </div>
    </div>
  );
}
