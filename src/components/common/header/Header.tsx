import { useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/icons/back-icon.png";
import CartIcon from "../../../assets/icons/cart-icon.png";
import "./Header.css";
import useLatLngStore from "./../../../store/useLatLngStore";
import customAxios from "./../../../api/axios";
import apiRoutes from "./../../../api/apiRoutes";
import { cartType } from "src/types/ordersType";

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
  const cartQuantity = localStorage.getItem("cartCount");
  const { lat, lng } = useLatLngStore();

  const getCartData = () => {
    const cartData = localStorage.getItem("orderData");
    return cartData && JSON.parse(cartData).orders;
  };

  const handleCartIconClick = async () => {
    const coordinate =
      lat === "" && lng === "" ? [] : [parseFloat(lat), parseFloat(lng)];
    const orders = getCartData();

    if (orders !== null && orders !== undefined) {
      const postOrderData: cartType = {
        orders,
        coordinate,
      };

      try {
        const response = await customAxios.post(apiRoutes.cart, postOrderData);
        localStorage.setItem("cartData", JSON.stringify(response.data.data));
        if (response?.status !== 200) throw new Error("예외가 발생했습니다.");
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    }
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
        <div className="headerCart" onClick={handleCartIconClick}>
          <img src={CartIcon} className="cartIcon" />
          <div className="cartQuantity">{cartQuantity ? cartQuantity : 0}</div>
        </div>
      )}
    </div>
  );
};

export default Header;
