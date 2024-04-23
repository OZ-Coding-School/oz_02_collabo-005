import { ReactNode } from "react";
import "./Layout.css";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Layout;
