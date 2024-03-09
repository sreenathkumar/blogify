import PostCard from "@components/PostCard";
import LoadingPost from "@components/loading/LoadingPost";
import SidebarCard from "@components/sidebar/SidebarCard";
import { useAuth } from "@hooks/useAuth";
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import { useRef } from "react";

export default function Home() {
  const { auth } = useAuth();
  //const { data, error, isLoading, isError } = useBlogs("All");
  const loaderRef = useRef(null);
  const { data, isError, error, hasMore } = useInfiniteScroll(
    "/blogs",
    loaderRef,
    3
  );

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* <!-- Blog Contents --> */}
          <div className="space-y-3 md:col-span-5">
            {/* <!-- Blog Card Start --> */}

            {!isError ? (
              data?.length > 0 && (
                <>
                  {
                    //card lists
                    data?.map((blog) => (
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
                    ))
                  }
                </>
              ) //end of data.length
            ) : (
              <div className="text-center">{error}</div>
            )}
            {hasMore && <LoadingPost ref={loaderRef} />}
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
