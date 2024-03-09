import Field from "@components/Field";
import { useAuth } from "@hooks/useAuth";
import { useAxios } from "@hooks/useAxios";
import { fileToDataURL, objectToFormData } from "@utils/general";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateBlog() {
  const api = useAxios();
  const { dispatchAuth } = useAuth();
  const navigate = useNavigate();

  //call the useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [blogImage, setBlogImage] = useState(null); // state to hold the blog image for api call
  const [currentImage, setCurrentImage] = useState(null); //state to hold the current image for preview

  //Create a reference for file input
  const blogImageRef = useRef(null);

  //handle image upload
  const handleImageUpload = (e) => {
    e.preventDefault();
    blogImageRef.current.addEventListener("change", handleImageChange);
    blogImageRef.current.click();
  };

  const handleImageChange = async (e) => {
    setBlogImage(e.target.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      try {
        const dataUrl = await fileToDataURL(e.target.files[0]);
        setCurrentImage(dataUrl);
      } catch (error) {
        console.error("Error converting file to data URL:", error);
      }
    }
  };

  //Handle form submission
  const onSubmit = async (data) => {
    const newFormData = {
      ...data,
      thumbnail: blogImage,
    };
    const formData = objectToFormData(newFormData);

    const toastId = toast.loading("Saving Blog Post...");
    try {
      const response = await api.post("/blogs", formData);
      console.log(response);
      if (response.status === 201) {
        //redirect to the blog page
        navigate(`/blog/${response.data?.blog.id}`);
        dispatchAuth({
          type: "AUTH_BLOG_CREATED",
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
        reset();
      }
    } catch (error) {
      //handle error

      //update the loading toast with error
      toast.update(toastId, {
        render: "Error creating blog post",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };
  //console.log(blogImage);
  return (
    <section>
      <div className="container">
        {/* Form Input field for creating Blog Post */}
        <form className="createBlog" onSubmit={handleSubmit(onSubmit)}>
          <div
            onClick={handleImageUpload}
            className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4
          "
            style={{
              backgroundImage: blogImage ? `url(${currentImage})` : "none",
            }}
          >
            {!blogImage && (
              <>
                <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p>Upload Your Image</p>
                </div>
              </>
            )}
          </div>
          <input
            ref={blogImageRef}
            type="file"
            name="thumbnail"
            className="hidden"
          />

          <Field error={errors.title}>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your blog title"
              {...register("title", { required: "Title is required" })}
            />
          </Field>

          <Field error={errors.tags}>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              {...register("tags", { required: "Tags are required" })}
            />
          </Field>

          <Field error={errors.content}>
            <textarea
              id="content"
              name="content"
              placeholder="Write your blog content"
              rows="8"
              {...register("content", { required: "Content is required" })}
            ></textarea>
          </Field>
          <Field>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Create Blog
            </button>
          </Field>
        </form>
      </div>
    </section>
  );
}
