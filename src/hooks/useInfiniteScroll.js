import { api } from "@api/api";
import { useEffect, useState } from "react";

const useInfiniteScroll = (url, elementRef, limit = 10) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const deleteItem = (id) => {
    const newBlogs = data.filter((blog) => blog.id !== id);
    setData(newBlogs);
  };

  useEffect(() => {
    //fetch blogs from the api
    const fetchBlogs = async () => {
      try {
        const response = await api.get(`${url}?page=${page}&limit=${limit}`);
        const { blogs } = response.data;

        if (blogs.length === 0) {
          setIsLoading(false);
          setHasMore(false);
        } else {
          setIsLoading(false);
          setData((prevData) => [...prevData, ...blogs]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        isLoading(false);
        setIsError(true);
        setError(
          "An error occurred while getting the blogs. Please refresh the page or contact: admin@example.com."
        );
      }
    };

    //what happen when the element is intersected
    const onIntersection = (items) => {
      if (items[0].isIntersecting && hasMore) {
        fetchBlogs();
      }
    };

    //observer to observe the element
    const observer = new IntersectionObserver(onIntersection);

    //start observing the element
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    //clean up
    return () => observer.disconnect();
  }, [elementRef.current, page, hasMore, isLoading, limit, url]);

  return { data, isLoading, error, isError, hasMore, deleteItem };
};

export default useInfiniteScroll;
