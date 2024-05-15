import { useLocation, useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/icons/back-icon.png";
import CartIcon from "../../../assets/icons/cart-icon.png";
import "./Header.css";

interface HeaderProps {
  hasBackIcon: boolean;
  title?: string;
  hasCartIcon: boolean;
  isFixed?: boolean;
  handleBackIconClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  hasBackIcon,
  title,
  hasCartIcon,
  isFixed,
  handleBackIconClick,
}) => {
  const navigate = useNavigate();
  const handleCartIcon = () => {
    navigate("/order/sheet");
  };

  const cartQuantity = localStorage.getItem("cartCount");

  return (
    <div className={`headerContainer ${isFixed ? "headerFixed" : ""}`}>
      {hasBackIcon && (
        <img
          src={BackIcon}
          className="backIcon"
          onClick={handleBackIconClick}
        />
      )}
      <div className="headerTitle">{title}</div>
      {hasCartIcon && (
        <div className="headerCart" onClick={handleCartIcon}>
          <img src={CartIcon} className="cartIcon" />
          <div className="cartQuantity">{cartQuantity ? cartQuantity : 0}</div>
        </div>
      )}
    </div>
  );
};

export default Header;
