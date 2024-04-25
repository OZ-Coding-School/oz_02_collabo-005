import React from "react";
import Header from "../../components/common/header/Header";
import AddressBar from "../../components/address/AddressBar";
import MenuItem from "../../components/restaurant/MenuItem";
import BackgroundImg from "../../assets/images/restaurantBackgroundImg.png";
import LogoImg from "../../assets/images/restaurantLogoImg.jpg";
// import MenuImg from "../../assets/images/menuImg.png";
import MenuCategory from "../../components/restaurant/MenuCategory";
import "./RestaurantPage.css";
import DropDownButton from "../../components/restaurant/DropDownButton";

const RestaurantPage: React.FC = () => {
  const categories = [
    "Bestseller",
    "Appetizers",
    "BBQ Bowls",
    "Coffe",
    "Coffe",
    "Coffe",
    "Coffe",
    "Drinks",
  ];
  return (
    <div>
      <Header hasBackIcon={true} title="restaurant name" hasCartIcon={true} />
      <AddressBar />
      <div className="restaurantContainer">
        <div className="restaurantInfoContainer">
          <div className="restaurantImgContainer">
            <img
              src={BackgroundImg}
              alt="레스토랑 배경 이미지"
              className="restaurantBackgroundImg"
            />
            <img src={LogoImg} className="restaurantLogoImg" />
          </div>
          <div className="restaurantProfile">
            <div className="restaurantDetails">
              <h2 className="restaurantName">레스토랑 이름</h2>
              <p className="businessHours">10 a.m~20 p.m</p>
            </div>
            <div className="restaurantIntroduction">
              Korean-style BBQ over fresh cooked rice, topped with western style
              sauces.
            </div>
            <div className="notificationMessage">
              *Free delivery minimum fee 14,900won
            </div>
            <DropDownButton />
          </div>
        </div>
        <div className="menuContainer">
          <MenuCategory categories={categories} />
          <div className="menuListContainer">
            <MenuItem />
            <MenuItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
