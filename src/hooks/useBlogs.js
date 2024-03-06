import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";
import { api } from "@api/api";
import { useAuth } from "./useAuth";

// hook to fetch blogs based on the type of blog
export const useBlogs = (type) => {
  const { auth } = useAuth();
  const privateApi = useAxios(); //authenticated api

  //get favorite blogs
  const fetchFavoriteBlogs = async () => {
    if (auth?.accessToken) {
      const response = await api.get("/blogs/favourites");
      return response.data;
    }
    return null;
  };

  //get popular blogs
  const fetchPopularBlogs = async () => {
    const response = await privateApi.get("/blogs/popular");
    return response.data;
  };

  //get all blogs
  const fetchAllBlogs = async () => {
    const response = await api.get("/blogs");
    return response.data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [type],
    queryFn: ({ queryKey }) => {
      switch (queryKey[0]) {
        case "favourite":
          return fetchFavoriteBlogs();
        case "popular":
          return fetchPopularBlogs();
        case "All":
          return fetchAllBlogs();
        default:
          throw new Error("Invalid blog type");
      }
    },
  });

  return { data, error, isLoading, isError };
};
