import { useEffect, useState } from "react";
import customAxios from "../api/axios";

const useGet = (url: string) => {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const callUrl = async () => {
      try {
        const { data } = await customAxios.get(url);
        setPayload(data);
      } catch (error) {
        console.error(error);
      }
    };

    callUrl();
  }, [url]); // url이 변경될 때만 호출

  return payload;
};

export default useGet;
