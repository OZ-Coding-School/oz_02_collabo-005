import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import MenuBackImg from "../../assets/images/menuImg.png";
import OptionList from "@components/restaurant/menu/OptionList";
import "./MenuPage.css";
import Button from "@components/common/button/Button";
import QuantityButton from "@components/common/button/QuantityButton";
import { useNavigate, useParams } from "react-router-dom";
import { menuOptionType, selectMenuType } from "src/types/menuOptionTypes";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";

type Order = {
  orders: {
    restaurant_id: number;
    menus: selectMenuType[];
  }[];
};

const MenuPage: React.FC = () => {
  const { restaurantId, menuId } = useParams();

  const [menuData, setMenuData] = useState<menuOptionType>();
  const [quantity, setQuantity] = useState(1);

  const [isValidated, setIsValidated] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const navigate = useNavigate();

  const handlePlusBtnClick = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinusBtnClick = (): void => {
    if (quantity == 1) return;
    setQuantity((prev) => prev - 1);
  };

  const updateCartCount = () => {
    const cartCount = localStorage.getItem("cartCount");

    if (!cartCount) localStorage.setItem("cartCount", JSON.stringify(quantity));
    else {
      const newCount = JSON.parse(cartCount) + quantity;
      localStorage.setItem("cartCount", JSON.stringify(newCount));
    }
  };

  const handleSubmit = (): void => {
    const currentMenu = {
      id: parseInt(menuId!),
      options: selectedOptions,
      quantity: quantity,
    };

    const orderData = localStorage.getItem("orderData");
    let updatedOrderData: Order;

    if (orderData === null) {
      updatedOrderData = {
        orders: [
          {
            restaurant_id: parseInt(restaurantId!),
            menus: [currentMenu],
          },
        ],
      };
    } else {
      updatedOrderData = JSON.parse(orderData);

      //이미 해당 레스토랑이 담겨있는지
      const restaurantOrder = updatedOrderData.orders.find(
        (order) => order.restaurant_id === parseInt(restaurantId!)
      );

      if (restaurantOrder) {
        const existingMenuIndex = restaurantOrder.menus.findIndex(
          (menu) =>
            menu.id === currentMenu.id &&
            JSON.stringify(menu.options) === JSON.stringify(currentMenu.options)
        );

        if (existingMenuIndex === -1) {
          restaurantOrder.menus.push(currentMenu);
        } else {
          restaurantOrder.menus[existingMenuIndex].quantity +=
            currentMenu.quantity;
        }
      } else {
        updatedOrderData.orders.push({
          restaurant_id: parseInt(restaurantId!),
          menus: [currentMenu],
        });
      }
    }

    localStorage.setItem("orderData", JSON.stringify(updatedOrderData));
    updateCartCount();

    alert("Order has been added to the basket.");
    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const response = await customAxios.get(
          `${apiRoutes.menuOptionList}?menuId=${menuId}`
        );
        if (response.status !== 200) throw new Error("예외가 발생했습니다.");
        setMenuData(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };
    getMenuData();
  }, []);

  console.log(menuData);

  return (
    <div>
      <Header hasBackIcon={true} hasCartIcon={true} isFixed={true} />
      <div className="menuPageContainer">
        <div className="menuPageInfo">
          <img src={MenuBackImg} className="MenuBackImg" alt="menuMainImage" />
          <div className="menuPageTitle">
            <div className="menuPageName">{menuData?.name}</div>
            <div className="menuPageDescription">{menuData?.description}</div>
          </div>
        </div>
        <div className="devidingLine"></div>
        <div className="menuPageOptionContainer">
          <div className="menuQuantitySection">
            <div className="quantityText">Quantity</div>
            <QuantityButton
              quantity={quantity}
              handlePlusBtnClick={handlePlusBtnClick}
              handleMinusBtnClick={handleMinusBtnClick}
            />
          </div>
          {menuData?.option_group_list.map((optionList, index) => (
            <OptionList
              optionList={optionList}
              key={index}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              setIsValidated={setIsValidated}
            />
          ))}
          <div className="AddToBasketBtn">
            <Button
              name="Add to Basket"
              backgroundColor={isValidated ? "#ff6347" : "#767676"}
              buttonType="bigButton"
              type="button"
              handleClick={handleSubmit}
              disabled={!isValidated}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
