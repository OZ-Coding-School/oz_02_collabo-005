import React, { useEffect, useState } from "react";
import MyOrderItem from "./MyOrderItem";
import "./MyOrderList.css";
import customAxios from "../../../api/axios";
import apiRoutes from "../../../api/apiRoutes";
import MyOrderEmpty from "./MyOrderEmpty";
import { OrderHistoryDataType } from "../../../types/ordersType";

const MyOrderList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryDataType[]>();

  useEffect(() => {
    const getRes = async () => {
      try {
        const response = await customAxios.get(apiRoutes.orderList);
        if (response.status === 200) {
          setOrderHistory(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getRes();
  }, []);

  return (
    !isLoading && (
      <div className="myOrderListContainer">
        {orderHistory?.length === 0 ? (
          <MyOrderEmpty />
        ) : (
          <>
            {orderHistory &&
              orderHistory
                .slice()
                .reverse()
                .map((orderHistoryList) => {
                  return (
                    <MyOrderItem
                      orderHistoryList={orderHistoryList}
                      key={orderHistoryList.id}
                    />
                  );
                })}
          </>
        )}
      </div>
    )
  );
};

export default MyOrderList;
