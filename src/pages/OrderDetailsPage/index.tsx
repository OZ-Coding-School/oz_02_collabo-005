import Header from "@components/common/header/Header";
import React, { useEffect, useState } from "react";
import AmountDetails from "@components/orders/ordersheet/amount/AmountDetails";
import AddressDetails from "@components/orders/ordersheet/deliverydetails/AddressDetails";
import "./OrderDetailsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import customAxios from "../../api/axios";
import apiRoutes from "../../api/apiRoutes";
import ViewOrderInstruction from "@components/orders/ordersheet/order/ViewOrderInstruction";
import { ViewOrderType } from "../../types/ordersType";
import OrderList from "@components/orders/ordersheet/order/OrderList";
import Loading from "@components/common/loading/loading";

const OrderDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewOrderData, setViewOrderData] = useState<ViewOrderType>();
  const { orderId } = useParams();
  const [isViewOrderDetail, setIsViewOrderDetail] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBackIconClick = () => {
    setIsViewOrderDetail(false);
    navigate(-1);
  };

  useEffect(() => {
    const getViewOrder = async () => {
      try {
        setIsLoading(true);
        const response = await customAxios.get(
          `${apiRoutes.orderDetail}?id=${orderId}`
        );
        if (response.data.status === 200) {
          setIsViewOrderDetail(true);
          setViewOrderData(response.data.data);
          setAddressData(response.data.data.address);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getViewOrder();
  }, []);

  return (
    <div>
      <Header
        hasBackIcon={true}
        title="Order Details"
        hasCartIcon={false}
        isFixed={true}
        handleBackIconClick={handleBackIconClick}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="orderSheetContainer">
          <div className="orderSection">
            {viewOrderData?.orders.map((order, index) => (
              <OrderList
                isViewOrderDetail={isViewOrderDetail}
                key={index}
                restaurant={order.restaurant}
                menus={order.menus}
              />
            ))}
          </div>
          <AmountDetails
            orderPrice={viewOrderData?.order_price}
            deliveryFee={viewOrderData?.delivery_fee}
            totalPrice={viewOrderData?.total_price}
            paymentMethod={viewOrderData?.payment_method}
            isViewOrderDetail={isViewOrderDetail}
          />
          <div className="OSsection">
            <div className="deliveryDetailsTitle">Delivery details</div>
            <AddressDetails addressData={addressData} />
          </div>
          <ViewOrderInstruction
            noteRider={viewOrderData?.rider_request}
            noteRes={viewOrderData?.store_request}
          />
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
