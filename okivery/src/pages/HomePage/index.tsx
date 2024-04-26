import React from "react";
import Header from "../../components/common/header/Header";
import FooterNavigationBar from "../../components/common/footer/FooterNavigationBar";
import RestaurantCategory from "../../components/home/category/RestaurantCategory";
import Banner from "../../components/home/banner/Banner";
import AddressBar from "../../components/address/AddressBar";
import "./HomePage.css";

export type Restaurant = {
  name: string;
  intro: string;
};

export type BannerType = {
  name: string;
};

const HomePage: React.FC = () => {
  const restaurants: Restaurant[] = [
    { name: "가게1", intro: "설명 1" },
    { name: "가게2", intro: "설명 2" },
    { name: "가게3", intro: "설명 3" },
    { name: "가게4", intro: "설명 4" },
    { name: "가게5", intro: "설명 5" },
  ];

  const banners: BannerType[] = [
    { name: "banner1" },
    { name: "banner2" },
    { name: "banner3" },
  ];
  return (
    <div>
      <Header
        hasBackIcon={false}
        title="Home"
        hasCartIcon={true}
        isFixed={true}
      />
      <AddressBar />
      <main className="mainContainer">
        <Banner banners={banners} />
        <div className="CategoryList">
          <RestaurantCategory
            title="American & Grills"
            id="AG"
            restaurants={restaurants}
          />
          <RestaurantCategory
            title="Korean & Fusion"
            id="KF"
            restaurants={restaurants}
          />
          <RestaurantCategory
            title="Dessert & Drinks"
            id="DD"
            restaurants={restaurants}
          />
        </div>
      </main>
      <FooterNavigationBar page="Home" />
    </div>
  );
};

export default HomePage;
