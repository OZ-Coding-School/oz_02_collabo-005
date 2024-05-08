import axios from "axios";

const customAxios = (() =>
  axios.create({
    baseURL: import.meta.env.DEV ? "" : "/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: import.meta.env.VITE_APP_API_TOKEN,
    },
  }))();

// axios interceptor으로 공부..
// client.interceptors.request.use((config) => {
//   여기서 토큰 로직 핸들링
//   return config;
// });
export default customAxios;
