import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getStoredLoginState } from "../store/useLoginStore";

const ProtectedRoute: React.FC = () => {
  const { isLogin } = getStoredLoginState();
  const currentLocation = useLocation();
  // 로그인 상태가 아니면 무조건 로그인 페이지로 리디렉션
  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ redirectedFrom: currentLocation }}
    />
  );
};

export default ProtectedRoute;
