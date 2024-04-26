<<<<<<< HEAD
import React, { useState } from "react";
import Header from "../../components/common/header/Header";
import AddressBar from "../../components/address/AddressBar";
import BackgroundImg from "../../assets/images/restaurantBackgroundImg.png";
import LogoImg from "../../assets/images/restaurantLogoImg.jpg";

import MenuCategory from "../../components/restaurant/MenuCategory";
import "./RestaurantPage.css";
import DropDownButton from "../../components/restaurant/DropDownButton";
import MenuList from "../../components/restaurant/MenuList";

=======
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

>>>>>>> 90654b8464aadb272ce9c51b515bd3b02d03805e
const RestaurantPage: React.FC = () => {
  const categories = [
    "Bestseller",
    "Appetizers",
    "BBQ Bowls",
<<<<<<< HEAD
    "Coffee",
    "Coffee",
    "Coffee",
    "Coffee",
    "Drinks",
    "Bestsellerssssszz",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleMenuCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
=======
    "Coffe",
    "Coffe",
    "Coffe",
    "Coffe",
    "Drinks",
  ];
>>>>>>> 90654b8464aadb272ce9c51b515bd3b02d03805e
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
          <MenuCategory
            categories={categories}
            handleMenuCategoryClick={handleMenuCategoryClick}
          />
          {/* {selectedCategory && <MenuList category={selectedCategory} />} */}
          <MenuList />
          {/* <MenuList category="Appetizers" /> */}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
