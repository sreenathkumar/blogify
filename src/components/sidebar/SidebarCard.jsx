import Loader from "@components/Loader";
import { useBlogs } from "@hooks/useBlogs";
import SingleSidebarBlog from "./SinglePopularBlog";

export default function SidebarCard({ cardTitle, blogType }) {
  //call hook using blogType
  const { data: blogData, error, isLoading, isError } = useBlogs(blogType);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
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
                title={blog.title}
                author={blog.author?.firstName + "" + blog.author?.lastName}
                authorId={blog.author?.id}
                likes={blog.likes.length}
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
