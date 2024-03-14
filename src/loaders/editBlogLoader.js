import { api } from "@api/api";

// ================================================================
// Loader function to fetch the blog data for editing
// ================================================================
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
