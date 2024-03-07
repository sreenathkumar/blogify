import { actions } from "@actions/actions";
import { useAuth } from "@hooks/useAuth";
import { useAxios } from "@hooks/useAxios";
import { notify, findFavourite, findLiked } from "@utils/general";

//Icons
import commentIcon from "@assets/icons/comment.svg";
import filledHeartIcon from "@assets/icons/heart-filled.svg";
import filledLikeIcon from "@assets/icons/like-filled.svg";
import heartIcon from "@assets/icons/heart.svg";
import likeIcon from "@assets/icons/like.svg";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const FloatingActions = ({
  numberOfComments,
  numberOfLikes,
  blogId,
  blogTitle,
  likes,
}) => {
  const api = useAxios(); // modified api
  const { auth, dispatchAuth } = useAuth();
  const [isLiked, setIsLiked] = useState(findLiked(likes, auth?.user?.id));
  const queryClient = useQueryClient();

  //check if the blog is a favourite
  const isFavourite = findFavourite(auth?.user?.favourites, blogId);

  //======================================
  //handle  like button
  //======================================
  const handleLike = async () => {
    if (auth?.accessToken) {
      //handle like
      //optimistic update
      setIsLiked(!isLiked);
      //send request to server
      try {
        const response = await api.post(`/blogs/${blogId}/like`);
        if (response.status !== 200) {
          setIsLiked(!isLiked);
        }
        queryClient.invalidateQueries(["Blogs", blogId]);
      } catch (error) {
        //if request fails, revert the optimistic update
        setIsLiked(!isLiked);
        notify("Something went wrong when toggling like", "error");
      }
    } else {
      notify("You need to login to like this post", "warning");
    }
  };

  //======================================
  //handle  favourite button
  //======================================
  const handleFavourite = async () => {
    if (auth?.accessToken) {
      //optimistic update
      if (isFavourite) {
        dispatchAuth({ type: actions.auth.REMOVE_FAVOURITE, payload: blogId });
      } else {
        dispatchAuth({
          type: actions.auth.ADD_FAVOURITE,
          payload: { id: blogId, title: blogTitle },
        });
      }

      //send request to server
      try {
        const response = await api.patch(`/blogs/${blogId}/favourite`);
        if (response.status !== 200) {
          //if request fails, revert the optimistic update
          if (isFavourite) {
            //As the user is removing the favourite, we need to revert the optimistic update
            dispatchAuth({
              type: actions.auth.ADD_FAVOURITE,
              payload: { id: blogId, title: blogTitle },
            });
          } else {
            //As the user is adding the favourite, we need to revert the optimistic update
            dispatchAuth({
              type: actions.auth.REMOVE_FAVOURITE,
              payload: blogId,
            });
          }
        }
      } catch (error) {
        //if request fails, revert the optimistic update
        if (isFavourite) {
          //As the user is removing the favourite, we need to revert the optimistic update
          dispatchAuth({
            type: actions.auth.ADD_FAVOURITE,
            payload: { id: blogId, title: blogTitle },
          });
        } else {
          //As the user is adding the favourite, we need to revert the optimistic update
          dispatchAuth({
            type: actions.auth.REMOVE_FAVOURITE,
            payload: blogId,
          });
        }
        notify("Something went wrong when toggling favourite", "error");
      }
    } else {
      notify("You need to login to favourite this post", "warning");
    }
  };

  //JSX
  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img
            src={isLiked ? filledLikeIcon : likeIcon}
            onClick={handleLike}
            alt="like"
          />
          <span>{numberOfLikes}</span>
        </li>

        <li>
          <img
            src={isFavourite ? filledHeartIcon : heartIcon}
            onClick={handleFavourite}
            alt="Favourite"
          />
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>{numberOfComments}</span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default FloatingActions;
