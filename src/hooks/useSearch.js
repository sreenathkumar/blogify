import { api } from "@api/api";
import { useEffect, useState } from "react";

//handle searching using debounce
const useSearch = (text) => {
  const [data, setData] = useState([]); //state to hold the api data
  const [error, setError] = useState(null); //state to hold the error
  const [isError, setIsError] = useState(false); //state to check if there is an error
  const [isLoading, setIsLoading] = useState(false); //state to check if the data is loading

  useEffect(() => {
    const getData = setTimeout(async () => {
      try {
        if (text.length > 0) {
          setIsLoading(true);
          const response = await api.get(`/search?q=${text}`);
          if (response.status === 200) {
            setData(response?.data?.data);
          }
          setIsLoading(false);
        } else {
          setData([]);
        }
      } catch (error) {
        setIsLoading(false);
        setData([]);
        setIsError(true);
        setError(error.response.data);
      }
    }, 500);

    return () => clearTimeout(getData);
  }, [text]);

  return { data, error, isError, isLoading };
};

export default useSearch;
