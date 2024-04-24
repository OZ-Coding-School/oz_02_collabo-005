import React from "react";
import Header from "../../components/common/header/Header";
import "./HomePage.css";
import FooterNavigationBar from "../../components/common/footer/FooterNavigationBar";
import Category from "../../components/home/category/Category";
import Banner from "../../components/home/banner/Banner";
import AddressBar from "../../components/address/AddressBar";

export type Restaurant = {
  name: string;
  intro: string;
};

export type BannerType = {
  name: string;
};

const index: React.FC = () => {
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
      <Header hasBackIcon={true} title="Home" hasCartIcon={true} />
      <AddressBar />
      <main className="mainContainer">
        <Banner banners={banners} />
        <div className="CategoryList">
          <Category
            title="American & Grills"
            id="AG"
            restaurants={restaurants}
          />
          <Category title="Korean & Fusion" id="KF" restaurants={restaurants} />
          <Category
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

export default index;
