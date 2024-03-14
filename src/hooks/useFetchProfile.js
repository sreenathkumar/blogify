import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

// ================================================================
// Custom hook which fetches the profile of the user and
// maintains a cache of it
// ================================================================
const useFetchProfile = (userId) => {
  const api = useAxios();
  //function to handle server request
  const fetchProfile = async ({ queryKey }) => {
    const response = await api.get(`/profile/${queryKey[1]}`);
    return response.data;
  };

  //handle the cacheing
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["Profile", userId],
    queryFn: fetchProfile,
  });
  return { data, error, isError, isLoading };
};

export default useFetchProfile;
