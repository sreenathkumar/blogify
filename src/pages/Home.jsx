import PostCard from "@components/PostCard";
import SidebarCard from "@components/sidebar/SidebarCard";
import { useAuth } from "@hooks/useAuth";
import { useBlogs } from "@hooks/useBlogs";

export default function Home() {
  const { auth } = useAuth();
  const { data, error, isLoading, isError } = useBlogs("All");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    throw new Error(error);
  }

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* <!-- Blog Contents --> */}
          <div className="space-y-3 md:col-span-5">
            {/* <!-- Blog Card Start --> */}
            {data?.blogs?.map((blog) => (
              <PostCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                image={blog.thumbnail}
                date={blog.createdAt}
                authorName={
                  blog.author?.firstName + " " + blog.author?.lastName
                }
                avatar={blog.author?.avatar}
                authorId={blog.author?.id}
                likes={blog.likes?.length}
              />
            ))}
            {/* <!-- Blog Card End --> */}
          </div>

          {/* <!-- Sidebar --> */}
          <div className="md:col-span-2 h-full w-full space-y-5">
            <SidebarCard cardTitle={"Most Popular 👍️"} blogType="popular" />
            {auth?.accessToken && (
              <SidebarCard
                cardTitle={"Your Favourites ❤️"}
                blogType="favourite"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
