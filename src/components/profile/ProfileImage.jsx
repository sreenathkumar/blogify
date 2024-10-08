import { useRef } from "react";
import { useProfile } from "@hooks/useProfile";
import { getImage } from "@utils/getImage";
import editIcon from "@assets/icons/edit.svg";
import { useAxios } from "@hooks/useAxios";
import { actions } from "@actions/actions";
import { useAuth } from "@hooks/useAuth";
import queryClient from "@utils/queryClient";

const ProfileImage = ({ avatar, fullname, isEditable }) => {
  const { dispatchAuth } = useAuth();
  const { dispatch: dispatchProfile } = useProfile();
  const fileRef = useRef(null);
  const api = useAxios();

  // =================================================================
  // 1. Function to handle image upload
  // 2. It will open the file dialog
  // 3. Listen the file change event
  // =================================================================
  const handleImageUpload = (e) => {
    e.preventDefault();
    fileRef.current.addEventListener("change", handleImageChange);
    fileRef.current.click();
  };

  // ================================================================
  // 1. This fuction will trigger when image is selected
  // 2. It will upload the image when user selects the image
  // 3. On success it will update the context and invalidate the query
  // ================================================================
  const handleImageChange = async (e) => {
    for (const file of e.target.files) {
      const formData = new FormData();
      formData.append("avatar", file);
      try {
        const response = await api.post("/profile/avatar", formData);

        if (response.status === 200) {
          dispatchProfile({
            type: actions.profile.USER_IMAGE_UPDATED,
            payload: response?.data?.user?.avatar,
          });

          dispatchAuth({
            type: actions.auth.USER_UPDATED,
            payload: response?.data?.user,
          });
          queryClient.invalidateQueries(["profile", response?.data?.user?.id]);
        }
      } catch (error) {
        dispatchProfile({
          type: actions.profile.DATA_LOAD_ERROR,
          payload: error.message,
        });
      }
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
        {avatar ? (
          <img
            className="w-full h-full rounded-full object-cover"
            src={getImage(avatar, "avatar")}
            alt={`${fullname}_avatar`}
          />
        ) : (
          <span className="">{fullname[0]}</span>
        )}
      </div>
      {isEditable && (
        <>
          <button
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            onClick={handleImageUpload}
          >
            <img src={editIcon} alt="Edit" />
          </button>
          <input ref={fileRef} type="file" className="hidden" />
        </>
      )}
    </div>
  );
};

export default ProfileImage;
