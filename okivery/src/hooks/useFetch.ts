import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

/**
 * @param fetcher API 요청 함수
 * @returns T
 * ```
 * const { data } = useFetch(() => apiRequest());
 * ```
 */

// get 요청에 대한 추상화 레이어 post, put, delete, patch는 이런 훅이 하나 더 필요
// <T> https://www.typescriptlang.org/ko/docs/handbook/2/generics.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetch = <T>(fetcher: () => Promise<AxiosResponse<T>>) => {
  const [data, setData] = useState<T>();
  // 필요하다면 loading, error에 대한 상태도 추가

  useEffect(() => {
    (async () => {
      const response = await fetcher();
      setData(response.data);
    })();
  }, []);

  return { data };
};
