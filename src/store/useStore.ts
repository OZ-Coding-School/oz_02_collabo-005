import { create } from "zustand";

type LoginState = {
  isLogin: boolean;
  loginToken: string | null;
  setLoginState: (isLogin: boolean, loginToken: string | null) => void;
};

const useLoginStore = create<LoginState>((set) => {
  // 로컬 스토리지에서 로그인 상태를 가져옴
  const storedIsLogin = localStorage.getItem("isLogin");
  const storedLoginToken = localStorage.getItem("loginToken");

  // 저장된 값이 있으면 사용하고, 없으면 초기값 사용
  const initialIsLogin = storedIsLogin ? JSON.parse(storedIsLogin) : false;
  const initialLoginToken = storedLoginToken || null;

  return {
    isLogin: initialIsLogin,
    loginToken: initialLoginToken,
    setLoginState: (isLogin, loginToken) => {
      set({ isLogin, loginToken });
      // 로컬 스토리지에 로그인 상태 저장
      localStorage.setItem("isLogin", JSON.stringify(isLogin));
      localStorage.setItem("loginToken", loginToken || ""); // 토큰이 null일 경우를 대비하여 빈 문자열로 저장
    },
  };
});

export default useLoginStore;
