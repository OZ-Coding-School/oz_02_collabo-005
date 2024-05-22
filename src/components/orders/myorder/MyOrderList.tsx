import React, { useEffect, useState } from "react";
import MyOrderItem from "./MyOrderItem";
import "./MyOrderList.css";
import customAxios from "../../../api/axios";
import apiRoutes from "../../../api/apiRoutes";
import MyOrderEmpty from "./MyOrderEmpty";
import { OrderHistoryDataType } from "../../../types/ordersType";
import Loading from "@components/common/loading/loading";

const MyOrderList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryDataType[]>();

  useEffect(() => {
    const getRes = async () => {
      setIsLoading(true);
      try {
        const response = await customAxios.get(apiRoutes.orderList);
        setOrderHistory(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getRes();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {orderHistory?.length === 0 ? (
            <MyOrderEmpty />
          ) : (
            <div className="myOrderListContainer">
              {orderHistory &&
                orderHistory
                  .slice()
                  .reverse()
                  .map((orderHistoryList) => {
                    return (
                      <MyOrderItem
                        orderHistoryList={orderHistoryList}
                        orderId={orderHistoryList.id}
                        key={orderHistoryList.id}
                      />
                    );
                  })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyOrderList;
