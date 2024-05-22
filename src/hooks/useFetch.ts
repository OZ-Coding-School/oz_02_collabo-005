import { useEffect, useState } from "react";
import customAxios from "../api/axios";

const useGet = <T>(url: string) => {
  const [response, setResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const callUrl = async () => {
      setIsLoading(true);
      try {
        const { data } = await customAxios.get<T>(url);
        setResponse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    callUrl();
  }, [url]); // url이 변경될 때만 호출

  return { response, isLoading };
};

export default useGet;
