import Loader from "@components/Loader";
import { useBlogs } from "@hooks/useBlogs";
import SingleSidebarBlog from "./SinglePopularBlog";

export default function SidebarCard({ cardTitle, blogType }) {
  // ========================================================================
  // 1. Custom hook to fetch and cache the blogs based on the type of blogs
  // 2. Accept parameter which defines the type of blogs
  // 3. Blog Type: popular, favourite, All(default)s
  // ========================================================================
  const { data: blogData, error, isLoading, isError } = useBlogs(blogType);

  // Show loading spinner when data is loading
  if (isLoading) {
    return <Loader />;
  }

  // Show error message which somting went wrong
  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="sidebar-card">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          {cardTitle}
        </h3>

        <ul className="space-y-5 my-5">
          {blogData?.blogs?.length > 0 ? (
            blogData.blogs.map((blog) => (
              <SingleSidebarBlog
                key={blog.id}
                blogId={blog.id}
                title={blog.title}
                author={blog.author?.firstName + "" + blog.author?.lastName}
                authorId={blog.author?.id}
                likes={blog.likes?.length}
                tags={blog.tags.split(",")}
                type={blogType}
              />
            ))
          ) : (
            <p className=" text-red-400">No Blogs available</p>
          )}
        </ul>
      </div>
    </>
  );
}
