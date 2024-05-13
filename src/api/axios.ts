import axios from "axios";
import useLoginStore from "../store/useStore";

const customAxios = (() =>
  axios.create({
    baseURL: import.meta.env.DEV ? "/api/v1" : "",
    headers: {
      "Content-Type": "application/json",
    },
  }))();

// 요청 전에 실행되는 인터셉터
customAxios.interceptors.request.use(
  (config) => {
    const loginToken = useLoginStore.getState().loginToken;
    const isLogin = useLoginStore.getState().isLogin;

    // 로그인되어 있으면 헤더에 인증 토큰 추가
    if (isLogin && loginToken) {
      config.headers.Authorization = `Bearer ${loginToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
