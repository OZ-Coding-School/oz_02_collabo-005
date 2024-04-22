import { Link } from "react-router-dom";
import BackIcon from "../../../assets/icons/back-icon.png";
import CartIcon from "../../../assets/icons/cart-icon.png";

import "../../../styles/common/header/Header.css";

interface HeaderProps {
  hasBackicon: boolean;
  title: string;
  hasCartIcon: boolean;
}

const Header: React.FC<HeaderProps> = ({ hasBackicon, title, hasCartIcon }) => {
  return (
    <div className="header-container">
      {hasBackicon && (
        <Link to="/login">
          <img src={BackIcon} className="back-icon" />
        </Link>
      )}
      <div className="header-title">{title}</div>
      {hasCartIcon && (
        <div className="header-cart">
          <img src={CartIcon} className="cart-iocn" />
          <div className="cart-quantity">0</div>
        </div>
      )}
    </div>
  );
};

export default Header;
