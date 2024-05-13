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
  const [operatingHours, setOperatingHours] = useState<string>();
  const [isPreparing, setIsPreparing] = useState<boolean>(true);

  const handleMenuCategoryClick = (event: string) => {
    setSelectedMenuList(getMenuList(event));
  };

  const getMenuList = (event: string) => {
    const menuList = restaurantInfo?.menu_group_list.filter(
      (menuGroup) => menuGroup.name === event
    )[0];
    return menuList;
  };

  const checkAmOrPm = (
    hour: string | undefined,
    min: string | undefined
  ): string => {
    let openingTime = "";
    if (hour !== undefined && parseInt(hour)) {
      if (parseInt(hour) < 12) {
        openingTime = `am ${hour}:${min}`;
      } else if (parseInt(hour) === 12) {
        openingTime = `pm ${String(parseInt(hour))}:${min}`;
      } else if (parseInt(hour) === 24) {
        openingTime = `am 00:${min}`;
      } else {
        openingTime = `pm ${String(parseInt(hour) - 12)}:${min}`;
      }
    }
    return openingTime;
  };

  // 레스토랑 메뉴 가져오는 함수
  useEffect(() => {
    const getRestaurantMenus = async () => {
      try {
        const response = await customAxios.get(
          `${apiRoutes.menuList}?restaurantId=${restaurantId}`
        );
        if (response.status !== 200) throw new Error("예외가 발생했습니다.");
        setRestaurantInfo(response.data);
        setSelectedMenuList(response.data?.menu_group_list[0]);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };
    getRestaurantMenus();
  }, []);

  // 메뉴 카테고리 추출 & 카테고리 초기값 설정해주는 함수
  useEffect(() => {
    if (restaurantInfo !== undefined) {
      const extractCategories = () => {
        const menuCategories = restaurantInfo?.menu_group_list.map(
          (menuGroup) => menuGroup.name
        );
        setCategories(menuCategories);
      };
      extractCategories();
    }
  }, [restaurantInfo]);

  useEffect(() => {
    const openHour = restaurantInfo?.opening_time.slice(0, 2);
    const openMin = restaurantInfo?.opening_time.slice(3, 5);
    const closeHour = restaurantInfo?.closing_time.slice(0, 2);
    const closeMin = restaurantInfo?.closing_time.slice(3, 5);

    const openingTime = checkAmOrPm(openHour, openMin);
    const closingTime = checkAmOrPm(closeHour, closeMin);

    setOperatingHours(`${openingTime} ~ ${closingTime}`);
  }, [restaurantInfo]);

  useEffect(() => {
    if (restaurantInfo !== undefined && restaurantInfo.status !== undefined) {
      setIsPreparing(restaurantInfo.status !== 1);
    }
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
              alt="레스토랑 배경 이미지" // 추후에 restaurantInfo.image로 교체
              className="restaurantBackgroundImg"
            />
            <div className="restaurantLogoImgContainer">
              <RestaurantLogo
                src={LogoImg} // 추후에 restaurantInfo.logo로 교체
              />
            </div>
          </div>
          <div className="restaurantProfile">
            <div className="restaurantDetails">
              <h2 className="restaurantName">{restaurantInfo?.name}</h2>
              <p className="businessHours">{operatingHours}</p>
            </div>
            <div className="restaurantIntroduction">
              {restaurantInfo?.description}
            </div>
            <div className="notificationMessage">
              {isPreparing && (
                <div>
                  Operating Status:{" "}
                  <span className="preparingMessage">
                    Currently under preparation
                  </span>
                </div>
              )}
              <div className="deliveryMinimumFee">
                *Free delivery minimum fee{" "}
                {restaurantInfo?.minimum_order_amount}
                won
              </div>
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
          <MenuList
            selectedMenuList={selectedMenuList}
            isPreparing={isPreparing}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
