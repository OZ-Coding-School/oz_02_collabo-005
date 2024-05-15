import Header from "@components/common/header/Header";
import OrderList from "@components/orders/ordersheet/order/OrderList";
import React, { useEffect, useState } from "react";
import AmountDetails from "@components/orders/ordersheet/amount/AmountDetails";
import AddressDetails from "@components/orders/ordersheet/deliverydetails/AddressDetails";
import "./OrderDetailsPage.css";
import { useNavigate } from "react-router-dom";
import { ViewOrderType } from "../../types/ordersType";
import customAxios from "../../api/axios";
import apiRoutes from "../../api/apiRoutes";
import { AddressType } from "../../types/addressType";
import ViewOrderInstruction from "@components/orders/ordersheet/order/ViewOrderInstruction";

const OrderDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewOrderData, setViewOrderData] = useState<ViewOrderType[]>();
  const [addressData, setAddressData] = useState<AddressType>({
    mainAddress: "",
    subAddress: "",
  });

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
    // const getViewOrder = async () => {
    //   try {
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getViewOrder();
    getAddress();
  }, []);

  return (
    <div>
      <Header
        hasBackIcon={true}
        title="Order Details"
        hasCartIcon={false}
        isFixed={true}
        handleBackIconClick={() => navigate(-1)}
      />
      <div className="orderSheetContainer">
        <div className="orderSection">
          <OrderList />
        </div>
        <AmountDetails />
        <div className="OSsection">
          <div className="deliveryDetailsTitle">Delivery details</div>
          <AddressDetails
            mainAddress={addressData.mainAddress}
            subAddress={addressData.subAddress}
          />
        </div>
        <ViewOrderInstruction />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
