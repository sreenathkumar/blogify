import { Link } from "react-router-dom";

export default function SingleSidebarBlog({
  title,
  author,
  authorId,
  likes,
  type,
  tags,
}) {
  return (
    <li>
      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
        {title}
      </h3>
      <p className="text-slate-600 text-sm">
        {type === "favaourite" ? (
          <>
            {tags?.map((tag, index) => (
              <span key={index} className="text-slate-300 text-xs">
                {tag}
              </span>
            ))}
          </>
        ) : (
          <>
            {"by"} <Link to={`user/${authorId}/profile`}>{author}</Link>
            <span> · </span> {likes} Likes
          </>
        )}
      </p>
    </li>
  );
}
