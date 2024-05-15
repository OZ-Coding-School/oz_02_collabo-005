import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginState = {
  isLogin: boolean;
  loginToken: string | null;
  refreshToken: string | null;
  setLoginState: (
    isLogin: boolean,
    loginToken: string | null,
    refreshToken: string | null
  ) => void;
};

export const useLoginStore = create<LoginState>(
  persist(
    (set) => ({
      // 초기 값
      isLogin: false,
      loginToken: null,
      refreshToken: null,
      setLoginState: (isLogin, loginToken, refreshToken) =>
        set({ isLogin, loginToken, refreshToken }),
    }),
    {
      // 로컬 스토리지에 문자열 형태로 isLogin, loginToken, refreshToken 저장
      name: "login-storage",
    }
  ) as (set: (fn: (state: LoginState) => LoginState) => void) => LoginState
);

export const getStoredLoginState = () => {
  // 로컬 스토리지의 문자열 형태의 데이터를 저장
  const storedDataString = localStorage.getItem("login-storage");
  // 문자열 형태의 데이터를 객체 형태로 변환
  const storedData = storedDataString && JSON.parse(storedDataString);

  if (storedData) {
    const storedIsLogin = storedData.state.isLogin;
    const storedLoginToken = storedData.state.loginToken;
    const storedRefreshToken = storedData.state.refreshToken;

    const isLogin = storedIsLogin;
    const loginToken = storedLoginToken || null;
    const refreshToken = storedRefreshToken || null;

    return { isLogin, loginToken, refreshToken };
  } else {
    return { isLogin: false, loginToken: null, refreshToken: null };
  }
};
