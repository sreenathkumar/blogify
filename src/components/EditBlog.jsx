import { useAuth } from "@hooks/useAuth";
import { useBlogMutation } from "@hooks/useBlogMutation";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Field from "./Field";

const EditBlog = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const loaderData = useLoaderData(); //get the data from the route loader

  //call the useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: loaderData?.title || "",
      tags: loaderData?.tags || "",
      content: loaderData?.content || "",
    },
  });

  const {
    imageFieldRef,
    handleImageUpload,
    onSubmit,
    currentImage,
    blogImage,
    imageError,
  } = useBlogMutation(
    { type: "edit", id: loaderData?.id, thumbnail: loaderData?.thumbnail },
    reset
  );

  //if the user is not the author of the blog
  if (loaderData?.author?.id !== auth?.user?.id && loaderData) {
    return (
      <div className="flex flex-col p-10">
        <h1 className=" text-red-500 text-center font-semibold">
          You cannot edit this blog
        </h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
          className="bg-indigo-600 w-auto text-white px-6 py-2 mt-4 self-center  md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Go to Home
        </button>
      </div>
    );
  }

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
          <Field error={{ message: imageError }}>
            <input
              ref={imageFieldRef}
              type="file"
              name="thumbnail"
              className="hidden"
            />
          </Field>
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
              Update Blog
            </button>
          </Field>
        </form>
      </div>
    </section>
  );
};

export default EditBlog;
