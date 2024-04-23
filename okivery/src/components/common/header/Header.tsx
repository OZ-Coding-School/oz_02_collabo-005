import { Link } from "react-router-dom";
import BackIcon from "../../../assets/icons/back-icon.png";
import CartIcon from "../../../assets/icons/cart-icon.png";
import "./Header.css";

interface HeaderProps {
  hasBackIcon: boolean;
  to: string;
  title: string;
  hasCartIcon: boolean;
}

const Header: React.FC<HeaderProps> = ({
  hasBackIcon,
  to,
  title,
  hasCartIcon,
}) => {
  return (
    <div className="headerContainer">
      {hasBackIcon && (
        <Link to={to}>
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
