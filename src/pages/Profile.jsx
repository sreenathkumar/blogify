import { actions } from "@actions/actions";
import { useAuth } from "@hooks/useAuth";
import { useProfile } from "@hooks/useProfile";
import { getImage } from "@utils/getImage";
import { useEffect } from "react";
//Components
import editIcon from "@assets/icons/edit.svg";
import PostCard from "@components/PostCard";
import Loader from "@components/Loader";
import Bio from "@components/profile/Bio";
import { useAxios } from "@hooks/useAxios";

export default function Profile() {
  const api = useAxios();
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();
  const { firstName, lastName, email, avatar, blogs } = state.user || {};
  const fullname = `${firstName} ${lastName}`;

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_LOADING });

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_LOADED,
            payload: response.data,
          });
        }
      } catch (error) {
        //console.log(error);
        dispatch({
          type: actions.profile.DATA_LOAD_ERROR,
          payload: error.message,
        });
      }
    };

    fetchProfile();
  }, []);

  if (state.loading) {
    return <Loader />;
  }

  if (state.error) {
    throw new Error(state.error);
  }

  return (
    <div className="container">
      {/* Profile info */}
      <div className="flex flex-col items-center py-8 text-center">
        {/* Profile image */}
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
          <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
            {avatar ? (
              <img
                className="w-full h-full rounded-full object-cover"
                src={getImage(avatar, "avatar")}
                alt={`${fullname}_avatar`}
              />
            ) : (
              <span className="">{"fullName[0]"}</span>
            )}
          </div>

          <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
            <img src={editIcon} alt="Edit" />
          </button>
        </div>

        {/* Name, email */}
        <div>
          <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
            {fullname || "User Name"}
          </h3>
          <p className="leading-[231%] lg:text-lg">{email}</p>
        </div>

        {/* Bio */}
        <Bio />
        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
      </div>
      {/* End profile info */}

      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        {
          // Profile's blogs
          blogs?.length > 0 ? (
            blogs?.map((blog) => {
              return (
                <PostCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  image={blog.image}
                  author={blog.author}
                  date={blog.date}
                  likes={blog.likes}
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
