import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import OptionList from "@components/restaurant/menu/OptionList";
import "./MenuPage.css";
import Button from "@components/common/button/Button";
import QuantityButton from "@components/common/button/QuantityButton";
import { useNavigate, useParams } from "react-router-dom";
import { menuOptionType } from "../../types/menuOptionTypes";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";
import { Order } from "../../types/ordersType";
import { addCommasToNumberString } from "./../../utils/addCommas";
import Loading from "@components/common/loading/loading";

const MenuPage: React.FC = () => {
  const { restaurantId, menuId } = useParams();

  const [menuData, setMenuData] = useState<menuOptionType>();
  const [quantity, setQuantity] = useState(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const navigate = useNavigate();
  const menuPrice = menuData?.price || 0;

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

    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    const getMenuData = async () => {
      try {
        setIsLoading(true);
        const response = await customAxios.get(
          `${apiRoutes.menuOptionList}?menuId=${menuId}`
        );
        setMenuData(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMenuData();
  }, []);

  return (
    <div>
      <Header
        hasBackIcon={true}
        hasCartIcon={true}
        isFixed={true}
        handleBackIconClick={() => navigate(-1)}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="menuPageContainer">
            {menuData?.image && (
              <div className="menuBackImgContainer">
                <img
                  src={menuData?.image}
                  className="MenuBackImg"
                  alt="menuMainImage"
                />
              </div>
            )}
            <div className="MPmainContainer">
              <div className="menuPageInfo">
                <div className="menuPageTitle">
                  <div className="menuPageName">{menuData?.name}</div>
                  <div className="menuPageDescription">
                    {menuData?.description}
                  </div>
                  <div className="menuPrice">
                    <div>Price</div>
                    <div>{addCommasToNumberString(menuPrice)} won</div>
                  </div>
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
                <div className="MPOptionListContainer">
                  {menuData?.option_group_list.map((optionList, index) => (
                    <OptionList
                      optionList={optionList}
                      key={index}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                      setIsValidated={setIsValidated}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="AddToBasketBtnContainer">
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
      )}
    </div>
  );
};

export default MenuPage;
