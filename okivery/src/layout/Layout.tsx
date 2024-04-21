import "../styles/layout/Layout.css";
import { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='container'>{children}</div>;
};

export default Layout;
