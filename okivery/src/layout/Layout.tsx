import { ReactNode } from "react";
import "../styles/layout/Layout.css";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='container'>{children}</div>;
};

export default Layout;
