import { useEffect, useState } from 'react';
import customAxios from '../api/axios';

// get
const useQuery = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [_, forceRender] = useState(0);

  const refetch = () => {
    forceRender((prev) => prev + 1);
    return data;
  };

  useEffect(() => {
    const callUrl = async () => {
      setIsLoading(true);
      try {
        const { data } = await customAxios.get<T>(url);
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    callUrl();
  }, [url]); // url이 변경될 때만 호출

  return { data, isLoading, refetch };
};
// post, put, patch, delete

export { useQuery };
