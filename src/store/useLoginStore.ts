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
      // Initialize state
      isLogin: false,
      loginToken: null,
      refreshToken: null,
      // Set state and persist to localStorage
      setLoginState: (isLogin, loginToken, refreshToken) =>
        set({ isLogin, loginToken, refreshToken }),
    }),
    {
      name: "login-storage", // Key to use for localStorage
    }
  ) as (set: (fn: (state: LoginState) => LoginState) => void) => LoginState // Cast the return type to match
);

export const getStoredLoginState = () => {
  const storedDataString = localStorage.getItem("login-storage");
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
