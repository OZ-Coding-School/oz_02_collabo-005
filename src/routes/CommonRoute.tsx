import React from "react";
import useLoginStore from "../store/useStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const CommonRoute: React.FC = () => {
  const isLogin = useLoginStore.getState().isLogin;
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
