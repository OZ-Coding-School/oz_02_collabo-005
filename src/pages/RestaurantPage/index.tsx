import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import AddressBar from "@components/address/AddressBar";
import MenuCategory from "@components/restaurant/MenuCategory";
import "./RestaurantPage.css";
import DropDownButton from "@components/restaurant/DropDownButton";
import MenuList from "@components/restaurant/MenuList";
import RestaurantLogo from "@components/common/restaurantlogo/RestaurantLogo";
import { useNavigate, useParams } from "react-router-dom";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";
import { MenuGroupType, RestaurantInfoType } from "../../types/restaurantTypes";
import { addCommasToNumberString } from "../../utils/addCommas";
import Loading from "@components/common/loading/loading";

const RestaurantPage: React.FC = () => {
  const { restaurantId } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfoType>();
  const [categories, setCategories] = useState<string[]>();
  const [selectedMenuList, setSelectedMenuList] = useState<MenuGroupType>();
  const [operatingHours, setOperatingHours] = useState<string>();
  const [isPreparing, setIsPreparing] = useState<boolean>(true);
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await customAxios.get(apiRoutes.address);
        if (response.status === 200) {
          if (!response.data.error) {
            setAddress(response.data.base);
          }
        }
      } catch (error) {
        setAddress("Please click here and enter your address");
      }
    };
    // 레스토랑 메뉴 가져오는 함수
    const getRestaurantMenus = async () => {
      setIsLoading(true);
      try {
        const response = await customAxios.get(
          `${apiRoutes.menuList}?restaurantId=${restaurantId}`
        );
        setRestaurantInfo(response.data);
        setSelectedMenuList(response.data?.menu_group_list[0]);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAddress();
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
      setIsPreparing(restaurantInfo.status !== 200001);
    }
  }, [restaurantInfo]);

  const minimumFee = restaurantInfo?.minimum_order_amount || 16900;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Header
            hasBackIcon={true}
            title={restaurantInfo?.name}
            hasCartIcon={true}
            isFixed={true}
            handleBackIconClick={() => navigate("/home")}
          />
          <div>
            <AddressBar address={address} />
            <div className="restaurantContainer">
              <div className="restaurantInfoContainer">
                <div className="restaurantImgContainer">
                  {restaurantInfo?.image && (
                    <img
                      src={restaurantInfo?.image}
                      alt="restaurant Background Img"
                      className="restaurantBackgroundImg"
                    />
                  )}
                  <div className="restaurantLogoImgContainer">
                    <RestaurantLogo src={restaurantInfo?.logo} />
                  </div>
                </div>
                <div className="restaurantProfile">
                  <div className="restaurantDetails">
                    <h2 className="restaurantName">{restaurantInfo?.name}</h2>
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
                      {addCommasToNumberString(minimumFee)} won
                    </div>
                  </div>
                  <div className="operatingMessage">
                    <p className="businessHours">{operatingHours} </p>
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
                  restaurantId={restaurantId!}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantPage;
