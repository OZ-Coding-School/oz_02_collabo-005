import React, { useState } from "react";
import Header from "@components/common/header/Header";
import MenuBackImg from "../../assets/images/menuImg.png";
import OptionList from "@components/restaurant/menu/OptionList";
import "./MenuPage.css";
import Button from "@components/common/button/Button";
import QuantityButton from "@components/common/button/QuantityButton";

export type optionType = {
  type: string;
  isRequired: boolean;
  optionList: {
    optionName: string;
    optionPrice: string;
  }[];
};

const MenuPage: React.FC = () => {
  const options: optionType[] = [
    {
      type: "Sauce",
      isRequired: true,
      optionList: [
        {
          optionName: "Cheese sauce",
          optionPrice: "0",
        },
        {
          optionName: "Mayonaise",
          optionPrice: "0",
        },
        {
          optionName: "Yum Yum",
          optionPrice: "0",
        },
        {
          optionName: "Wassabi Mayo",
          optionPrice: "0",
        },
      ],
    },
    {
      type: "Other toppings",
      isRequired: false,
      optionList: [
        {
          optionName: "Lettuce",
          optionPrice: "900",
        },
        {
          optionName: "Lettuce",
          optionPrice: "900",
        },
        {
          optionName: "Lettuce",
          optionPrice: "900",
        },
        {
          optionName: "Lettuce",
          optionPrice: "900",
        },
      ],
    },
  ];

  const [quantity, setQuantity] = useState(1);

  const handlePlusBtnClick = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinusBtnClick = (): void => {
    if (quantity == 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <div>
      <Header hasBackIcon={true} hasCartIcon={true} isFixed={true} />
      <div className="menuPageContainer">
        <div className="menuPageInfo">
          <img src={MenuBackImg} className="MenuBackImg" alt="menuMainImage" />
          <div className="menuPageTitle">
            <div className="menuPageName">Bulgogi Beef Bowl</div>
            <div className="menuPageDescription">
              Bowl of rice topped with bulgogi beef and suace
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
          {options.map((option, index) => (
            <OptionList option={option} key={index} />
          ))}
          <div className="AddToBasketBtn">
            <Button
              name="Add to Basket"
              backgroundColor="#ff6347"
              to="/order/sheet"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
