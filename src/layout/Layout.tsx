import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="layoutContainer">
      <Outlet />
    </div>
  );
};

export default Layout;
