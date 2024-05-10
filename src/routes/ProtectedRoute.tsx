import React from "react";
import useLoginStore from "../store/useStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isLogin = useLoginStore.getState().isLogin;
  const currentLocation = useLocation();
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
