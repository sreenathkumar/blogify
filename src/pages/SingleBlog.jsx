//Hooks
import { useSingleBlog } from "@hooks/useSingleBlog";
import { formatDate } from "@utils/general";
import { getImage } from "@utils/getImage";
import { Link, useParams } from "react-router-dom";

//Components
import CommentSection from "@components/CommentSection";
import Loader from "@components/Loader";
import AvatarImage from "@components/AvatarImage";

export default function SingleBlog() {
  const { blogId } = useParams(); //get blogId from url

  const { data: blog, error, isError, isLoading } = useSingleBlog(blogId); //fetch single blog

  const {
    title,
    content,
    thumbnail,
    author,
    tags,
    comments,
    createdAt: date,
    likes,
  } = blog || {};

  const fullName = author?.firstName + " " + author?.lastName;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Something went wrong. {error.message}</p>;
  }

  return (
    <>
      <section>
        <div className="container text-center py-8">
          <h1 className="font-bold text-3xl md:text-5xl">{blog.title}</h1>
          <div className="flex justify-center items-center my-4 gap-4">
            <Link
              to={`/user/${author?.id}/profile`}
              className="flex items-center capitalize space-x-2"
            >
              <AvatarImage avatar={author?.avatar} name={fullName} />
              <h5 className="text-slate-500 text-sm">{fullName}</h5>
            </Link>
            <span className="text-sm text-slate-700 dot">
              {formatDate(date)}
            </span>
            <span className="text-sm text-slate-700 dot">
              {likes.length} Likes
            </span>
          </div>
          <img
            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
            src={getImage(thumbnail, "blog")}
            alt={title}
          />

          {/* Tags */}
          <ul className="tags">
            {tags?.split(",").map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>

          {/* Content */}
          <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
            {content}
          </div>
        </div>
      </section>

      <CommentSection
        comments={comments}
        likes={likes}
        blogId={blogId}
        blogTitle={title}
      />
    </>
  );
}
