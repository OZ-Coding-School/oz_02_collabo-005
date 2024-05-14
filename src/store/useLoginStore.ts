import { create } from "zustand";

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

const useLoginStore = create<LoginState>((set) => {
  // 로컬 스토리지에서 로그인 상태를 가져옴
  const storedIsLogin = localStorage.getItem("isLogin");
  const storedLoginToken = localStorage.getItem("loginToken");
  const storedRefreshToken = localStorage.getItem("refreshToken");

  // 저장된 값이 있으면 사용하고, 없으면 초기값 사용
  const initialIsLogin = storedIsLogin ? JSON.parse(storedIsLogin) : false;
  const initialLoginToken = storedLoginToken || null;
  const initialRefreshToken = storedRefreshToken || null;

  return {
    isLogin: initialIsLogin,
    loginToken: initialLoginToken,
    refreshToken: initialRefreshToken,
    setLoginState: (isLogin, loginToken, refreshToken) => {
      set({ isLogin, loginToken, refreshToken });
      // 로컬 스토리지에 로그인 상태 저장(페이지 새로고침하면 상태가 초기화되는것을 방지)
      localStorage.setItem("isLogin", JSON.stringify(isLogin));
      localStorage.setItem("loginToken", loginToken || ""); // 토큰이 null일 경우를 대비하여 빈 문자열로 저장
      localStorage.setItem("refreshToken", refreshToken || "");
    },
  };
});

export default useLoginStore;
