import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTo: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("menu")) window.scrollTo(0, 30);
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollTo;
