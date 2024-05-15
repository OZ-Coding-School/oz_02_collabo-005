import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import MenuBackImg from "../../assets/images/menuImg.png";
import OptionList from "@components/restaurant/menu/OptionList";
import "./MenuPage.css";
import Button from "@components/common/button/Button";
import QuantityButton from "@components/common/button/QuantityButton";
import { useParams } from "react-router-dom";
import { menuOptionType, postOptionType } from "src/types/menuOptionTypes";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";

const MenuPage: React.FC = () => {
  const { restaurantId, menuId } = useParams();
  const [menuData, setMenuData] = useState<menuOptionType>();
  const [quantity, setQuantity] = useState(1);

  const handlePlusBtnClick = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinusBtnClick = (): void => {
    if (quantity == 1) return;
    setQuantity((prev) => prev - 1);
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
            <OptionList optionList={optionList} key={index} />
          ))}
          <div className="AddToBasketBtn">
            <Button
              name="Add to Basket"
              backgroundColor={"#ff6347"}
              buttonType="bigButton"
              type="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
