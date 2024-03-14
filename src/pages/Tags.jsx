import PostCard from "@components/PostCard";
import LoadingPost from "@components/loading/LoadingPost";
import SidebarCard from "@components/sidebar/SidebarCard";
import { useAuth } from "@hooks/useAuth";
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const Tags = () => {
  const { auth } = useAuth();
  const loaderRef = useRef(null);
  const { tag } = useParams();
  const {
    data: blogs,
    isError,
    error,
    hasMore,
    deleteItem,
  } = useInfiniteScroll("/blogs", loaderRef, 3);

  const filterByTag = blogs?.filter((blog) => {
    return blog.tags.includes(tag);
  });

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* <!-- Blog Contents --> */}
          <div className="space-y-3 md:col-span-5">
            {/* <!-- Blog Card Start --> */}
            <h2 className="text-3xl py-4 font-bold md:col-span-5">
              Showing Results for{" "}
              <span className=" text-blue-500 font-bold">#{tag}</span>
            </h2>
            {!isError ? (
              filterByTag?.length > 0 && (
                <>
                  {
                    //card lists
                    filterByTag?.map((blog) => (
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
                        onDelete={deleteItem}
                      />
                    ))
                  }
                </>
              ) //end of data.length
            ) : (
              <div className="text-center">{error}</div>
            )}
            {hasMore ? (
              <LoadingPost ref={loaderRef} />
            ) : (
              <p className="text-red-500 text-sm "> No more blogs to show</p>
            )}
          </div>

          {/* <!-- Sidebar --> */}
          <div className="md:col-span-2 h-full w-full space-y-5">
            <SidebarCard cardTitle={"Most Popular 👍️"} blogType="popular" />
            {auth?.accessToken && (
              <SidebarCard cardTitle={"Favourites ❤️"} blogType="favourite" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Tags;
