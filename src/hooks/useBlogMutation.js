import { blobToFile, fileToDataURL, objectToFormData } from "@utils/general";
import { useEffect, useRef, useState } from "react";
import { useAxios } from "./useAxios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import { actions } from "@actions/actions";

// ================================================================
// custom hook which handles the blog creation and editing
// takes the type of mutation, the id of the blog, the thumbnail
// and state reset function when it is in edit mode
// otherwise it just takes the type of mutation and reset
// ================================================================

export const useBlogMutation = (blogAction, reset) => {
  const api = useAxios();
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();
  const imageFieldRef = useRef(null); //Create a reference for file input
  const [blogImage, setBlogImage] = useState(null); // state to hold the blog image for api call
  const [currentImage, setCurrentImage] = useState(null); //state to hold the current image for preview
  const [imageError, setImageError] = useState(null); //state to hold the image error

  // ====================================
  // function to handle image change
  // ====================================
  const handleImageChange = async (e) => {
    setImageError(null);
    setBlogImage(e.target.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      try {
        const dataUrl = await fileToDataURL(e.target.files[0]);
        setCurrentImage(dataUrl);
      } catch (error) {
        setImageError(error.message);
      }
    } else {
      setImageError("Image is required");
    }
  };

  // =================================
  // function handle image upload
  // =================================
  const handleImageUpload = (e) => {
    e.preventDefault();
    imageFieldRef.current.addEventListener("change", handleImageChange);
    imageFieldRef.current.click();
  };

  // ====================================
  // function to create blog
  // ====================================
  const createBlog = async (data, toastId) => {
    try {
      const response = await api.post("/blogs", data);

      if (response.status === 201) {
        dispatchAuth({
          type: actions.auth.AUTH_BLOG_CREATED,
          payload: response.data?.blog,
        });

        //updatate the loading toast with success
        toast.update(toastId, {
          render: "Blog Post Created",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setCurrentImage(null);
        setImageError(null);
        reset();
        //redirect to the blog page
        navigate(`/blog/${response.data?.blog.id}`);
      }
    } catch (error) {
      //handle error
      setImageError("Error creating blog post");
      //update the loading toast with error
      toast.update(toastId, {
        render: "Error creating blog post",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  // ====================================
  // function to update blog
  // ====================================
  const updateBlog = async (data, id, toastId) => {
    if (id) {
      try {
        const response = await api.patch(`/blogs/${id}`, data);

        if (response.status === 200) {
          dispatchAuth({
            type: actions.auth.AUTH_BLOG_UPDATED,
            payload: response.data,
          });

          //updatate the loading toast with success
          toast.update(toastId, {
            render: "Blog Post Updated",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setCurrentImage(null);
          setImageError(null);
          reset();
          //redirect to the blog page
          navigate(`/blog/${id}`);
        }
      } catch (error) {
        //handle error
        setImageError("Error updating blog post");
        //update the loading toast with error
        toast.update(toastId, {
          render: "Error updatting blog post",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  };

  //====================================
  //fuction to handle form submission
  //====================================
  const onSubmit = async (data) => {
    if (!blogImage) {
      setImageError("Image is required");
      return;
    }
    const newFormData = {
      ...data,
    };

    const formData = objectToFormData(newFormData);
    formData.append("thumbnail", blogImage);

    const toastId = toast.loading("Saving Blog Post...");

    if (blogAction?.type === "edit" && blogAction?.id) {
      updateBlog(formData, blogAction?.id, toastId);
    } else if (blogAction?.type === "create") {
      createBlog(formData, toastId);
    } else {
      throw new Error("Invalid action type");
    }
  };

  useEffect(() => {
    //get image blob from the server
    const getImageBlob = async (thumbnail) => {
      const response = await api.get(`/uploads/blog/${thumbnail}`, {
        responseType: "blob",
      });
      if (response.status === 200) {
        setCurrentImage(URL.createObjectURL(response.data));
        setBlogImage(blobToFile(response.data, thumbnail));
      }
    };

    const isBlobUrl = blogAction?.thumbnail?.startsWith("blob:"); //check if the image is a blob url

    if (blogAction?.type === "edit" && isBlobUrl) {
      setCurrentImage(blogAction.thumbnail);
      setBlogImage(blogAction.thumbnail);
    }

    if (blogAction?.type === "edit" && !isBlobUrl) {
      getImageBlob(blogAction.thumbnail);
    }
  }, []);

  //return the necessary values
  return {
    imageFieldRef,
    handleImageUpload,
    onSubmit,
    currentImage,
    blogImage,
    imageError,
  };
};
