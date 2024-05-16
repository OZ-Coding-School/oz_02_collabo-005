import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getStoredLoginState } from "../store/useLoginStore";

const CommonRoute: React.FC = () => {
  const { isLogin } = getStoredLoginState();
  const currentLocation = useLocation();
  // 로그인 상태면 무조건 홈으로 리디렉션
  return isLogin ? (
    <Navigate
      to={"/home"}
      replace
      state={{ redirectedFrom: currentLocation }}
    />
  ) : (
    <Outlet />
  );
};

export default CommonRoute;
