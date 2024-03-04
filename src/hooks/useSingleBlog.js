import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useSingleBlog = (id) => {
  const api = useAxios();

  //fetch single blog
  const fetchSingleBlog = async ({ queryKey }) => {
    const response = await api.get(`/blogs/${queryKey[1]}`);
    return response.data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["All", id],
    queryFn: fetchSingleBlog,
  });

  return { data, error, isLoading, isError };
};
