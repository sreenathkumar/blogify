import { actions } from "@actions/actions";
import editIcon from "@assets/icons/edit.svg";
import { useAxios } from "@hooks/useAxios";
import { useProfile } from "@hooks/useProfile";
import { useState } from "react";

const Bio = ({ bio, isEditable }) => {
  const { dispatch } = useProfile();
  const api = useAxios();

  const [bioText, setBioText] = useState(bio || "No bio");
  const [isEditing, setIsEditing] = useState(false);

  //handler function to handle the bio text change
  const handleBioChange = async (e) => {
    e.preventDefault();
    dispatch({ type: actions.profile.DATA_LOADING });

    try {
      const response = await api.patch(`/profile/`, {
        bio: bioText,
      });
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_UPDATED,
          payload: response.data.user,
        });
      }
      setIsEditing(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_LOAD_ERROR,
        payload: error.message,
      });
    }

    setBioText(e.target.value);
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      {
        // Editable bio text
        isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              className="w-full md:min-w-[500px] h-20 p-2 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <button
              className="py-2 px-4 w-auto rounded bg-indigo-500"
              onClick={handleBioChange}
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                {bioText}
              </p>
            </div>
            {isEditable && (
              <button className="flex-center h-7 w-7 rounded-full">
                <img
                  src={editIcon}
                  alt="Edit"
                  onClick={() => setIsEditing(true)}
                />
              </button>
            )}
          </>
        )
      }
    </div>
  );
};

export default Bio;
