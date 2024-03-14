import { useAuth } from "@hooks/useAuth";
import { useAxios } from "@hooks/useAxios";
import deleteIcon from "@icons/delete.svg";
import editIcon from "@icons/edit.svg";
import { notify } from "@utils/general";
import queryClient from "@utils/queryClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ActionMenu({ id, onDelete }) {
  const api = useAxios();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleDeleteBlog = async (e) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;
    //deleting the blog
    const deleteToast = toast.loading("Deleting the blog...");
    try {
      //check if the blog is in the user's favourites
      const isFavorite = auth.user.favourites?.findIndex(
        (blog) => blog.id === id
      );

      //if isFavorite true
      if (isFavorite !== -1) {
        // unfavourite the blog
        unfavouriteBlog(id, deleteToast);
        //send delete request to the server
        deleteBlog(id, deleteToast);
      } else {
        //send delete request to the server
        deleteBlog(id, deleteToast);
      }
    } catch (error) {
      toast.update(deleteToast, {
        render: "An error occurred while deleting the blog. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  //function to unfavourite a blog
  const unfavouriteBlog = async (id, toastId) => {
    //send a request to the server to update the favourite status and invalidate the favourite query
    try {
      const response = await api.patch(`/blogs/${id}/favourite`);
      if (response.status === 200) {
        queryClient.invalidateQueries("favourite");
        return true;
      }
    } catch (error) {
      //handle error
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  //function to handle the delete blog
  const deleteBlog = async (id, toastId) => {
    //send a request to the server to delete the blog
    try {
      //send a request to the server to delete the blog
      const response = await api.delete(`/blogs/${id}`);
      if (response.status === 200) {
        if (onDelete) {
          onDelete(id);
        }
        toast.update(toastId, {
          render: "Blog deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        queryClient.invalidateQueries();
      }
    } catch (error) {
      //handle error
      notify(error.message, "error");
    }
  };

  //fuction to handle the edit blog
  const handleEditBlog = (e) => {
    e.stopPropagation();
    //navigate to the edit page
    navigate(`/blog/${id}/edit`);
  };

  return (
    <div className="action-modal-container">
      <button
        onClick={handleEditBlog}
        className="action-menu-item hover:text-lwsGreen"
      >
        <img src={editIcon} alt="Edit" />
        Edit
      </button>
      <button
        onClick={handleDeleteBlog}
        className="action-menu-item hover:text-red-500"
      >
        <img src={deleteIcon} alt="Delete" />
        Delete
      </button>
    </div>
  );
}
