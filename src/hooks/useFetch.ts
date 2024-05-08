import { useEffect, useState } from "react";
import customAxios from "../api/axios";

const useGet = (url: string) => {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const callUrl = async () => {
    try {
      const { data } = await customAxios.get(url);
      setPayload(data);
    } catch {
      setError("something is worng!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    callUrl();
  }, []);
  return { payload, loading, error };
};

export { useGet };
