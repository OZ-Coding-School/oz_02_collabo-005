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
import { CartDataType, OrderDataType } from "../../types/ordersType";
import { AddressType } from "../../types/addressType";
import customAxios from "./../../api/axios";
import apiRoutes from "./../../api/apiRoutes";
import "./OrderSheetPage.css";
import { useLatLngStore } from "./../../store/useLatLngStore";
import Loading from "@components/common/loading/loading";

type RequestType = {
  store_request: string;
  rider_request: string;
};

const OrderSheetPage: React.FC = () => {
  const navigate = useNavigate();
  const { lat, lng } = useLatLngStore();
  const [cartData, setCartData] = useState<CartDataType | null>(null);
  const [addressData, setAddressData] = useState<AddressType | null>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [requestState, setRequestState] = useState<RequestType>({
    store_request: "",
    rider_request: "",
  });

  const coordinate =
    lat === "" && lng === "" ? [] : [parseFloat(lat), parseFloat(lng)];

  const handleInputChange = (field: string, value: string): void => {
    setRequestState({ ...requestState, [field]: value });
  };

  const handleSubmit = () => {
    const { orders } = JSON.parse(localStorage.getItem("orderData")!);

    if (orders) {
      const payOrderData: OrderDataType = {
        orders,
        delivery_address: `${addressData?.mainAddress} ${addressData?.subAddress}`,
        coordinate: coordinate,
        store_request: requestState.store_request,
        rider_request: requestState.rider_request,
        payment_method: 0,
      };

      localStorage.setItem("payOrderData", JSON.stringify(payOrderData));
    }

    navigate("/payment");
  };

  useEffect(() => {
    const getCartData = () => {
      setIsLoading(true);
      const getData = JSON.parse(localStorage.getItem("cartData")!);
      if (getData !== null && getData.orders.length !== 0) {
        setCartData(getData);
      }
      setIsLoading(false);
    };
    getCartData();
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      setIsLoading(true);
      try {
        const response = await customAxios.get(apiRoutes.address);
        setAddressData({
          mainAddress: response.data.base,
          subAddress: response.data.detail,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAddress();
  }, []);

  useEffect(() => {
    if (cartData && cartData.orders.length > 0) {
      const hasInvalidMenu = cartData.orders.some((order) =>
        order.menus.some((menu) => menu.status === 210002)
      );

      const hasInvalidRestaurant = cartData.orders.some(
        (order) => order.restaurant.status !== 200001
      );

      setIsValidated(!hasInvalidMenu && !hasInvalidRestaurant);
    } else {
      setIsValidated(false);
    }
  }, [cartData]);

  return (
    <div>
      <Header
        hasBackIcon={true}
        title="My Ordersheet"
        hasCartIcon={false}
        isFixed={true}
        handleBackIconClick={() => navigate(-1)}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
                <button
                  className="addMoreBtn"
                  onClick={() => navigate("/home")}
                >
                  + Add More
                </button>
              </div>
              <AmountDetails
                orderPrice={cartData.order_price}
                deliveryFee={cartData.delivery_fee}
                totalPrice={cartData.total_price}
              />
              <div className="OSsection">
                <div className="deliveryDetailsTitle">Delivery address</div>
                {addressData ? (
                  <AddressDetails
                    addressData={`${addressData.mainAddress} ${addressData.subAddress}`}
                  />
                ) : (
                  <AddressNotFound />
                )}
              </div>
              <div className="OSsection">
                <div className="deliveryDetailsTitle">Instructions</div>
                <RequestInputSection
                  handleInputChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="ordersheetSubmitBtn">
                <Button
                  name="Proceed to Payment"
                  buttonType="bigButton"
                  backgroundColor={
                    addressData && isValidated ? "#FF6347" : "#767676"
                  }
                  handleClick={handleSubmit}
                  disabled={!addressData || !isValidated}
                />
              </div>
            </div>
          ) : (
            <OrderSheetEmpty />
          )}
        </>
      )}
    </div>
  );
};

export default OrderSheetPage;
