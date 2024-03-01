import PostCard from "../components/PostCard";
import SidebarCard from "../components/SidebarCard";

export default function Home() {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* <!-- Blog Contents --> */}
          <div className="space-y-3 md:col-span-5">
            {/* <!-- Blog Card Start --> */}
            <PostCard />
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
