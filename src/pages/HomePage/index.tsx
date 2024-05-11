import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import FooterNavigationBar from "@components/common/footer/FooterNavigationBar";
import RestaurantCategory from "@components/home/category/RestaurantCategory";
import Banner from "@components/home/banner/Banner";
import AddressBar from "@components/address/AddressBar";
import apiRoutes from "../../api/apiRoutes";
import customAxios from "./../../api/axios";
import "./HomePage.css";
import { RestaurantType } from "../../types/restaurantTypes";

export type BannerType = {
  name: string;
};

const HomePage: React.FC = () => {
  const banners: BannerType[] = [
    { name: "banner1" },
    { name: "banner2" },
    { name: "banner3" },
  ];

  const [restaurants, setRestaurants] = useState<RestaurantType[]>();

  const [categories, setCategories] = useState<{
    [key: string]: RestaurantType[];
  }>({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await customAxios.get(apiRoutes.restaurantList);
        if (response.status !== 200) throw new Error("예외가 발생했습니다.");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const extractCategories = () => {
      if (!restaurants || restaurants.length === 0) {
        setCategories({});
        return;
      }

      const categoriesSet = new Set();

      restaurants.forEach((restaurant) => {
        restaurant.category.forEach((category) => {
          categoriesSet.add(category);
        });
      });

      const updatedCategories: { [key: string]: RestaurantType[] } = {};

      Array.from(categoriesSet).forEach((category) => {
        const categoryRes = restaurants.filter((restaurant) =>
          restaurant.category.includes(category)
        );
        updatedCategories[category] = categoryRes;
      });
      setCategories(updatedCategories);
    };
    extractCategories();
  }, [restaurants]);

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
        <div className="categoryList">
          {Object.keys(categories).map((categoryKey) => (
            <RestaurantCategory
              key={categoryKey}
              title={categoryKey}
              restaurants={categories[categoryKey]}
            />
          ))}
        </div>
      </main>
      <FooterNavigationBar page="Home" />
    </div>
  );
};

export default HomePage;
