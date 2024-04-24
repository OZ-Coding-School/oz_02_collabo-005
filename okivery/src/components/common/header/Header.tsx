import { useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/icons/back-icon.png";
import CartIcon from "../../../assets/icons/cart-icon.png";
import "./Header.css";

interface HeaderProps {
  hasBackIcon: boolean;
  to?: string;
  title: string;
  hasCartIcon: boolean;
}

const Header: React.FC<HeaderProps> = ({ hasBackIcon, title, hasCartIcon }) => {
  const navigate = useNavigate();
  const handleBackIconClick = () => {
    navigate(-1);
  };
  const handleCartIcon = () => {
    navigate("/order/sheet");
  };
  return (
    <div className="headerFixedContainer">
      <div className="headerContainer">
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
            <div className="cartQuantity">0</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
