import { Link } from "react-router-dom";
import BackIcon from "../../../assets/icons/back-icon.png";
import CartIcon from "../../../assets/icons/cart-icon.png";

import "../../../styles/common/header/Header.css";

interface HeaderProps {
  hasBackIcon: boolean;
  title: string;
  hasCartIcon: boolean;
}

const Header: React.FC<HeaderProps> = ({ hasBackIcon, title, hasCartIcon }) => {
  return (
    <div className="headerContainer">
      {hasBackIcon && (
        <Link to="/login">
          <img src={BackIcon} className="backIcon" />
        </Link>
      )}
      <div className="headerTitle">{title}</div>
      {hasCartIcon && (
        <div className="headerCart">
          <img src={CartIcon} className="cartIcon" />
          <div className="cartQuantity">0</div>
        </div>
      )}
    </div>
  );
};

export default Header;
