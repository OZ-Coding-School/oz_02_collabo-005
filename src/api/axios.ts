import axios from "axios";
import { getStoredLoginState, useLoginStore } from "../store/useLoginStore";

const refreshAxios = axios.create({
  baseURL: `/api/v1/token/refresh/`,
  timeout: 5000,
});

refreshAxios.interceptors.request.use(async (config) => {
  const { refreshToken } = getStoredLoginState();
  if (refreshToken) {
    config.data = {
      ...config.data,
      refresh: refreshToken,
    };
  }
  return config;
});

const customAxios = (() =>
  axios.create({
    baseURL: "/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  }))();

// refreshToken으로 accessToken 갱신하기
customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const { refreshToken } = getStoredLoginState();
      refreshToken;
      if (refreshToken) {
        try {
          const response = await refreshAxios.post("");
          const { isLogin } = getStoredLoginState();
          const newAccessToken = response.data.access;
          useLoginStore.setState({
            isLogin: isLogin,
            loginToken: newAccessToken,
            refreshToken: refreshToken,
          });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return customAxios(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh access token: ", refreshError);
        }
      } else {
        console.error("Refresh token not found.");
      }
    }
  }
);

// 요청 전에 실행되는 인터셉터
customAxios.interceptors.request.use(
  (config) => {
    const { isLogin, loginToken } = getStoredLoginState();

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
