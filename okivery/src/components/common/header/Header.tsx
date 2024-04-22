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
      {hasBackicon && <img src={BackIcon} className="back-icon" />}
      <div className="header-title">{title}</div>
      {hasCartIcon && <img src={CartIcon} className="cart-iocn" />}
    </div>
  );
};

export default Header;
