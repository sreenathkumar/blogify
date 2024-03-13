import { api } from "@api/api";

const editBlogLoader = async ({ params }) => {
  const { blogId } = params;

  if (blogId) {
    try {
      const response = await api.get(`/blogs/${blogId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return null;
    }
  }
  return null;
};
export default editBlogLoader;
