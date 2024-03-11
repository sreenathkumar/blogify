import { useAuth } from "@hooks/useAuth";
//Components
import Loader from "@components/Loader";
import PostCard from "@components/PostCard";
import Bio from "@components/profile/Bio";
import ProfileImage from "@components/profile/ProfileImage";
import useFetchProfile from "@hooks/useFetchProfile";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { auth } = useAuth();
  const { userId } = useParams();
  const {
    data: profileData,
    error,
    isError,
    isLoading,
  } = useFetchProfile(userId);

  const { firstName, lastName, email, blogs, avatar, bio } = profileData || {};

  const fullname = `${firstName} ${lastName}`;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <div className="container">
      {/* Profile info */}
      <div className="flex flex-col items-center py-8 text-center">
        {/* Profile image */}
        <ProfileImage
          avatar={avatar}
          fullname={fullname}
          isEditable={auth?.user?.id === userId}
        />
        {/* Name, email */}
        <div>
          <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
            {fullname || "User Name"}
          </h3>
          <p className="leading-[231%] lg:text-lg">{email}</p>
        </div>

        {/* Bio */}
        <Bio bio={bio} isEditable={auth?.user?.id === userId} />
        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
      </div>
      {/* End profile info */}

      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">
        {auth?.user?.id === userId ? "My" : `${fullname}'s`} Blogs
      </h4>
      <div className="my-6 space-y-4">
        {
          // Profile's blogs
          blogs?.length > 0 ? (
            blogs.map((blog) => {
              return (
                <PostCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  image={blog.thumbnail}
                  authorName={fullname}
                  avatar={avatar}
                  authorId={userId}
                  date={blog.createdAt}
                  likes={blog.likes?.length}
                />
              );
            })
          ) : (
            <div className="text-center text-red-300 text-2xl font-semibold">
              <p>{"You didn't post anything"}</p>
            </div>
          )
        }
      </div>
    </div>
  );
}
