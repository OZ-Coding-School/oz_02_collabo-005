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
import { useLatLngStore } from "../../store/useLatLngStore";
import loader from "../../services/GoogleMapLoad";
import { Geocoding } from "@components/address/Geocoding";
import Loading from "@components/common/loading/loading";
import Footer from "@components/common/footer/Footer";

export type BannerType = {
  name: string;
};

const HomePage: React.FC = () => {
  const banners: BannerType[] = [
    { name: "Event1" },
    { name: "Event2" },
    { name: "Event3" },
  ];

  const [restaurants, setRestaurants] = useState<RestaurantType[]>();
  const [categories, setCategories] = useState<{
    [key: string]: RestaurantType[];
  }>({});
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 레스토랑 리스트 get해오는 함수
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await customAxios.get(apiRoutes.address);
        setAddress(response.data.base);
        if (response.data.base !== "") {
          try {
            // 가져온 주소를 위도와 경도로 변환해서 저장
            await loader.importLibrary("maps");
            const { userLat, userLng } = await Geocoding(response.data.base);
            useLatLngStore.setState({ lat: userLat, lng: userLng });
          } catch (error) {
            console.error("Geocoding error: ", error);
          }
        }
      } catch (error) {
        setAddress("Please click here and enter your address");
      }
    };
    const fetchRestaurants = async () => {
      setIsLoading(true);
      try {
        const response = await customAxios.get(apiRoutes.restaurantList);
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAddress();
    fetchRestaurants();
  }, []);

  // 레스토랑 리스트에서 카테고리만 추출 & 카테고리에 따라 재정렬
  useEffect(() => {
    if (restaurants !== undefined) {
      const extractCategories = () => {
        const categoriesSet = new Set<string>();
        restaurants.forEach((restaurant) => {
          restaurant.category.forEach((category) => {
            categoriesSet.add(category);
          });
        });

        const updatedCategories: { [key: string]: RestaurantType[] } = {};

        Array.from(categoriesSet).forEach((category) => {
          const categoryResWithOpeningStatus = restaurants.filter(
            (restaurant) => {
              return (
                restaurant.category.includes(category) &&
                restaurant.status === 200001
              );
            }
          );

          const categoryResWithOtherStatus = restaurants.filter(
            (restaurant) => {
              return (
                restaurant.category.includes(category) &&
                restaurant.status !== 200001
              );
            }
          );

          const categoryRes = categoryResWithOpeningStatus.concat(
            categoryResWithOtherStatus
          );

          updatedCategories[category] = categoryRes;
        });
        setCategories(updatedCategories);
      };
      extractCategories();
    }
  }, [restaurants]);

  return (
    <>
      <Header
        hasBackIcon={false}
        title="Home"
        hasCartIcon={true}
        isFixed={true}
      />
      <div className="homeContainer">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <AddressBar address={address} />
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
          </div>
        )}
      </div>
      <Footer />
      <FooterNavigationBar page="Home" />
    </>
  );
};

export default HomePage;
