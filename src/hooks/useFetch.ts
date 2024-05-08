import { useCallback } from "react";
import { AxiosResponse } from "axios";
import customAxios from "../api/axios";

const useGet = (url: string) => {
  const get = useCallback(async () => {
    try {
      const response: AxiosResponse = await customAxios.get(url);
      return response.data;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  return get;
};

export { useGet };
