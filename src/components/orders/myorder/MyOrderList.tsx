import React, { useEffect, useState } from "react";
import MyOrderItem from "./MyOrderItem";
import "./MyOrderList.css";
import customAxios from "../../../api/axios";
import apiRoutes from "../../../api/apiRoutes";
import MyOrderEmpty from "./MyOrderEmpty";

const MyOrderList: React.FC = () => {
  const [isOrdersEmpty, setIsOrdersEmpty] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getRes = async () => {
      try {
        const response = await customAxios.get(apiRoutes.orderList);
        response && setIsOrdersEmpty(false);
        console.log(response);
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
        {isOrdersEmpty ? (
          <MyOrderEmpty />
        ) : (
          <>
            <MyOrderItem />
            <MyOrderItem />
          </>
        )}
      </div>
    )
  );
};

export default MyOrderList;
