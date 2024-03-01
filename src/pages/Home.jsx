import { useQuery } from "react-query";
import PostCard from "../components/PostCard";
import SidebarCard from "../components/SidebarCard";
import { getAllBlogs,} from "@api/blogApi";

export default function Home() {
  const { data, error, isLoading, isError } = useQuery("blogs", getAllBlogs);
  console.log(data);

  if (isLoading) {return <div>Loading...</div>;}
  if (isError) {throw new Error(error) ;}
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* <!-- Blog Contents --> */}
          <div className="space-y-3 md:col-span-5">
            {/* <!-- Blog Card Start --> */}
            {
              data?.blogs?.map((blog) => (
                <PostCard key={blog.id} 
                title={blog.title} 
                content={blog.content} 
                image={blog.thumbnail} 
                date={blog.createdAt}
                author={blog.author.firstName + " " + blog.author.lastName}
                likes={blog.likes.length}
                />
              ))
            }
            {/* <!-- Blog Card End --> */}
          </div>

          {/* <!-- Sidebar --> */}
          <div className="md:col-span-2 h-full w-full space-y-5">
            <SidebarCard cardTitle={"Most Popular 👍️"}></SidebarCard>
            <SidebarCard cardTitle={"Your Favourites ❤️"}></SidebarCard>
          </div>
        </div>
      </div>
    </section>
  );
}
