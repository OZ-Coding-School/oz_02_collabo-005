import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import AddressBar from "@components/address/AddressBar";
import BackgroundImg from "../../assets/images/restaurantBackgroundImg.png";
import LogoImg from "../../assets/images/restaurantLogoImg.jpg";
import MenuCategory from "@components/restaurant/MenuCategory";
import "./RestaurantPage.css";
import DropDownButton from "@components/restaurant/DropDownButton";
import MenuList from "@components/restaurant/MenuList";
import RestaurantLogo from "@components/common/restaurantlogo/RestaurantLogo";
import { useParams } from "react-router-dom";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";
import { MenuGroupType, RestaurantInfoType } from "src/types/restaurantTypes";

const RestaurantPage: React.FC = () => {
  const { restaurantId } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfoType>();
  const [categories, setCategories] = useState<string[]>();
  const [selectedMenuList, setSelectedMenuList] = useState<MenuGroupType>();

  const handleMenuCategoryClick = (event: string) => {
    setSelectedMenuList(getMenuList(event));
  };

  const getMenuList = (event: string) => {
    const menuList = restaurantInfo?.menu_group_list.filter(
      (menuGroup) => menuGroup.name === event
    )[0];
    return menuList;
  };

  useEffect(() => {
    const getRestaurantMenus = async () => {
      try {
        const response = await customAxios.get(
          `${apiRoutes.menuList}?restaurantId=${restaurantId}`
        );
        if (response.status !== 200) throw new Error("예외가 발생했습니다.");
        setRestaurantInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };
    getRestaurantMenus();
  }, []);

  useEffect(() => {
    setSelectedMenuList(restaurantInfo?.menu_group_list[0]);
    console.log(restaurantInfo);
    const extractCategories = () => {
      const menuCategories = restaurantInfo?.menu_group_list.map(
        (menuGroup) => menuGroup.name
      );
      setCategories(menuCategories);
    };
    extractCategories();
  }, [restaurantInfo]);

  return (
    <div>
      <Header
        hasBackIcon={true}
        title={restaurantInfo?.name}
        hasCartIcon={true}
        isFixed={true}
      />
      <AddressBar />
      <div className="restaurantContainer">
        <div className="restaurantInfoContainer">
          <div className="restaurantImgContainer">
            <img
              src={BackgroundImg}
              alt="레스토랑 배경 이미지"
              className="restaurantBackgroundImg"
            />
            <div className="restaurantLogoImgContainer">
              <RestaurantLogo src={LogoImg} />
            </div>
          </div>
          <div className="restaurantProfile">
            <div className="restaurantDetails">
              <h2 className="restaurantName">{restaurantInfo?.name}</h2>
              <p className="businessHours">10 a.m~20 p.m</p>
            </div>
            <div className="restaurantIntroduction">
              {restaurantInfo?.description}
            </div>
            <div className="notificationMessage">
              *Free delivery minimum fee {restaurantInfo?.minimum_order_amount}
              won
            </div>
            <DropDownButton origin={restaurantInfo?.notice} />
          </div>
        </div>
        <div className="menuContainer">
          <MenuCategory
            categories={categories}
            selectedCategory={selectedMenuList?.name}
            handleMenuCategoryClick={handleMenuCategoryClick}
          />
          <MenuList selectedMenuList={selectedMenuList} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
