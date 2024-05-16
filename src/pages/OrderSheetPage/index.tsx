import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/common/header/Header";
import OrderList from "@components/orders/ordersheet/order/OrderList";
import AmountDetails from "@components/orders/ordersheet/amount/AmountDetails";
import AddressDetails from "@components/orders/ordersheet/deliverydetails/AddressDetails";
import AddressNotFound from "@components/orders/ordersheet/deliverydetails/AddressNotFound";
import RequestInputSection from "@components/orders/ordersheet/instructions/RequestInputSection";
import Button from "@components/common/button/Button";
import OrderSheetEmpty from "@components/orders/ordersheet/empty/OrderSheetEmpty";
import { CartDataType } from "src/types/ordersType";
import { AddressType } from "src/types/addressType";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";
import "./OrderSheetPage.css";

const OrderSheetPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<CartDataType | null>(null);
  const [addressData, setAddressData] = useState<AddressType | null>(null);

  const handleSubmitClick = () => {
    navigate("/payment");
  };

  useEffect(() => {
    const getCartData = () => {
      const getData = JSON.parse(localStorage.getItem("cartData")!);
      if (getData !== null && getData.orders.length !== 0) {
        setCartData(getData);
      }
    };
    getCartData();
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await customAxios.get(apiRoutes.address);
        setAddressData({
          mainAddress: response.data.base,
          subAddress: response.data.detail,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, []);

  return (
    <div>
      <Header
        hasBackIcon={true}
        title="My Ordersheet"
        hasCartIcon={false}
        isFixed={true}
        handleBackIconClick={() => navigate(-1)}
      />
      {cartData && cartData.orders.length > 0 ? (
        <div className="orderSheetContainer">
          <div className="orderSection">
            {cartData.orders.map((order) => (
              <OrderList
                key={order.restaurant.id}
                restaurant={order.restaurant}
                menus={order.menus}
                setCartData={setCartData}
              />
            ))}
            <button className="addMoreBtn" onClick={() => navigate("/home")}>
              + Add More
            </button>
          </div>
          <AmountDetails
            orderPrice={cartData.order_price}
            deliveryFee={cartData.delivery_fee}
            totalPrice={cartData.total_price}
          />
          <div className="OSsection">
            <div className="deliveryDetailsTitle">Delivery details</div>
            {addressData ? (
              <AddressDetails
                mainAddress={addressData.mainAddress}
                subAddress={addressData.subAddress}
              />
            ) : (
              <AddressNotFound />
            )}
          </div>
          <div className="OSsection">
            <div className="deliveryDetailsTitle">Instructions</div>
            <RequestInputSection />
          </div>
          <div className="ordersheetSubmitBtn">
            <Button
              name="Proceed to Payment"
              buttonType="bigButton"
              backgroundColor={addressData ? "#FF6347" : "#767676"}
              handleClick={handleSubmitClick}
              disabled={!addressData}
            />
          </div>
        </div>
      ) : (
        <OrderSheetEmpty />
      )}
    </div>
  );
};

export default OrderSheetPage;
