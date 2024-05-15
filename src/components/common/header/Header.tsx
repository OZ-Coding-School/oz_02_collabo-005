import { useLocation, useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/icons/back-icon.png";
import CartIcon from "../../../assets/icons/cart-icon.png";
import "./Header.css";

interface HeaderProps {
  hasBackIcon: boolean;
  title?: string;
  hasCartIcon: boolean;
  isFixed?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  hasBackIcon,
  title,
  hasCartIcon,
  isFixed,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBackIconClick = () => {
    // /order/status 페이지에서는 뒤로가기버튼 누르면 /home 페이지로 이동
    if (location.pathname === "/order/status") {
      navigate("/home");
    } else {
      navigate(-1);
    }
  };
  const handleCartIcon = () => {
    navigate("/order/sheet");
  };
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
          <div className="cartQuantity">0</div>
        </div>
      )}
    </div>
  );
};

export default Header;
