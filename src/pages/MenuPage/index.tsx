import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import MenuBackImg from "../../assets/images/menuImg.png";
import OptionList from "@components/restaurant/menu/OptionList";
import "./MenuPage.css";
import Button from "@components/common/button/Button";
import QuantityButton from "@components/common/button/QuantityButton";
import { useParams } from "react-router-dom";
import {
  menuOptionType,
  postMenuType,
  postOptionType,
} from "src/types/menuOptionTypes";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";
import useOrderStore from "./../../store/useOrderStore";

const MenuPage: React.FC = () => {
  const { menuId } = useParams();
  const [menuData, setMenuData] = useState<menuOptionType>();
  const [quantity, setQuantity] = useState(1);

  const [selectedMenus, setSelectedMenus] = useState<postMenuType>();
  const [selectedOptionList, setSelectedOptionList] = useState<
    postOptionType[]
  >([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const { setPostOrders, postOrders } = useOrderStore();

  const handlePlusBtnClick = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinusBtnClick = (): void => {
    if (quantity == 1) return;
    setQuantity((prev) => prev - 1);
  };

  console.log(postOrders);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isValidated) {
      const strPostOrders = postOrders.map((menu) => JSON.stringify(menu)); // 문자열화된 기존 메뉴의 배열
      const strSelectedMenus = JSON.stringify(selectedMenus!);

      const targetIndex = strPostOrders.indexOf(strSelectedMenus);

      if (targetIndex === -1) {
        setPostOrders([...postOrders, selectedMenus!]);
      } else {
        postOrders.map((menu, index) =>
          index === targetIndex
            ? { ...menu, quantity: menu.quantity + 1 }
            : menu
        );
      }

      alert("장바구니 담기 성공");
    } else {
      alert("장바구니 담기 실패");
    }
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

  useEffect(() => {
    if (menuData !== undefined && menuData.option_group_list.length !== 0) {
      setSelectedMenus({
        menu_id: menuData?.id,
        quantity: quantity,
        option_list: selectedOptionList,
      });

      // 선택된 옵션 리스트에서 mandatory 옵션 그룹 중 선택된 옵션이 있는지 확인
      const hasAllRequiredOptions = menuData?.option_group_list
        .filter((optionGroup) => optionGroup.mandatory)
        .every((optionGroup) =>
          selectedOptionList.some(
            (selectedGroup) =>
              selectedGroup.group_id === optionGroup.option_group_id
          )
        );

      setIsValidated(hasAllRequiredOptions);
    }
  }, [selectedOptionList, quantity, menuData]);

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
              selectedOptionList={selectedOptionList}
              setSelectedOptionList={setSelectedOptionList}
            />
          ))}
          <div className="AddToBasketBtn">
            <Button
              name="Add to Basket"
              backgroundColor={isValidated ? "#ff6347" : "#767676"}
              buttonType="bigButton"
              handleClick={handleSubmit}
              type="button"
              disabled={!isValidated}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
