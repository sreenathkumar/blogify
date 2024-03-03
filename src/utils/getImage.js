//get images from the server
//name - image name
//type - image type (i.e. blog, avatar)
export const getImage = (name, type) => {
  if (type === "avatar") {
    return `${import.meta.env.VITE_API_URL}/uploads/avatars/${name}`;
  }
  if (type === "blog") {
    return `${import.meta.env.VITE_API_URL}/uploads/blogs/${name}`;
  }

  throw new Error("Invalid image type");
};
