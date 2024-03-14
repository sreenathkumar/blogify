import { Link } from "react-router-dom";

//Blog item comonent whcih will be used in the sidebar
export default function SingleSidebarBlog({
  blogId,
  title,
  author,
  authorId,
  likes,
  type,
  tags,
}) {
  return (
    <li>
      <Link
        to={`/blog/${blogId}`}
        className="text-slate-400 hover:text-slate-300"
      >
        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
          {title}
        </h3>
      </Link>
      <p className="text-slate-600 text-sm">
        {type === "favourite" ? (
          <>
            {tags?.map((tag, index) => (
              <Link
                to={`/tags/${tag.trim()}`}
                key={index}
                className="text-slate-600 text-sm cursor-pointer"
              >
                {`#${tag.trim()}`}
                {index < tags.length - 1 ? ", " : ""}
              </Link>
            ))}
          </>
        ) : (
          <>
            {"by"} <Link to={`/user/${authorId}/profile`}>{author}</Link>
            <span> · </span> {likes} Likes
          </>
        )}
      </p>
    </li>
  );
}
