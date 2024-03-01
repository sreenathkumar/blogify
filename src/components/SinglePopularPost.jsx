export default function SinglePopularPost({
  title,
  author,
  authorProfileLink,
  likesCount,
}) {
  return (
    <li>
      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
        {title}
      </h3>
      <p className="text-slate-600 text-sm">
        by
        <a href={authorProfileLink}>{author}</a>
        <span>·</span> {likesCount} Likes
      </p>
    </li>
  );
}
