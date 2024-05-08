import axios from 'axios';

export const client = (() =>
  axios.create({
    /**
     * vite 환경변수 접근
     * https://ko.vitejs.dev/guide/env-and-mode
     */
    baseURL: import.meta.env.DEV ? '' : 'http://118.67.135.218',
    headers: {
      // headers 설정
    },
  }))();

// axios interceptor으로 공부..
client.interceptors.request.use((config) => {
  // 여기서 토큰 로직 핸들링
  return config;
});
