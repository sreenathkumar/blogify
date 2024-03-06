//Icons
import { actions } from "@actions/actions";
import commentIcon from "@assets/icons/comment.svg";
import filledHeartIcon from "@assets/icons/heart-filled.svg";
import heartIcon from "@assets/icons/heart.svg";
import likeIcon from "@assets/icons/like.svg";
import { useAuth } from "@hooks/useAuth";
import { useAxios } from "@hooks/useAxios";
import { notify } from "@utils/general";
import { findFavourite } from "@utils/general";

const FloatingActions = ({ numberOfComment, blogId, blogTitle }) => {
  const api = useAxios(); // modified api
  const { auth, dispatchAuth } = useAuth();

  const isFavourite = findFavourite(auth?.user?.favourites, blogId); //check if the blog is a favourite

  //handle  like button
  const handleLike = () => {
    if (auth?.accessToken) {
      //handle like
    } else {
      notify("You need to login to like this post", "warning");
    }
  };
  //handle  favourite button
  const handleFavourite = async () => {
    if (auth?.accessToken) {
      console.log("handleFavourite");
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

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img src={likeIcon} alt="like" />
          <span>10</span>
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
            <img src={commentIcon} onClick={handleLike} alt="Comments" />
            <span>{numberOfComment}</span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default FloatingActions;
