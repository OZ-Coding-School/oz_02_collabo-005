import Header from "@components/common/header/Header";
import OrderList from "@components/orders/ordersheet/order/OrderList";
import React from "react";
import "./OrderSheetPage.css";
import AmountDetails from "@components/orders/ordersheet/amount/AmountDetails";
import AddressDetails from "@components/orders/ordersheet/deliverydetails/AddressDetails";
import AddressNotFound from "@components/orders/ordersheet/deliverydetails/AddressNotFound";
import RequestInputSection from "@components/orders/ordersheet/instructions/RequestInputSection";
import Button from "@components/common/button/Button";
import { useNavigate } from "react-router-dom";

export type menuType = {
  name: string;
  options: string[];
  price: string;
  quantity: number;
};

export type orderType = {
  restaurant: string;
  menus: menuType[];
};

export const orders: orderType[] = [
  {
    restaurant: "BBQ overrice",
    menus: [
      {
        name: "불고기덮밥",
        options: ["마요네즈", "얌얌", "와사비마요"],
        price: "15,800",
        quantity: 1,
      },
      {
        name: "제육덮밥",
        options: ["마요네즈", "와사비마요"],
        price: "13,800",
        quantity: 2,
      },
      {
        name: "제육덮밥",
        options: ["마요네즈", "와사비마요"],
        price: "13,800",
        quantity: 2,
      },
    ],
  },
  {
    restaurant: "EI Cubano",
    menus: [
      {
        name: "샌드위치",
        options: [],
        price: "12,900",
        quantity: 1,
      },
      {
        name: "샐러드",
        options: [
          "토마토",
          "간장",
          "간장",
          "간장",
          "간장",
          "간장",
          "간장",
          "간장",
          "간장",
          "간장",
          "간장",
          "간장",
          "간장",
          "간장",
        ],
        price: "13,800",
        quantity: 3,
      },
    ],
  },
];

const OrderSheetPage: React.FC = () => {
  const hasAddress = true;
  const navigate = useNavigate();

  const handleSubmitClick = () => {
    navigate("/payment");
  };

  return (
    <div>
      <Header
        hasBackIcon={true}
        title="My Ordersheet"
        hasCartIcon={false}
        isFixed={true}
      />
      <div className="orderSheetContainer">
        <div className="orderSection">
          {orders.map((order) => (
            <OrderList order={order} />
          ))}
          <button className="addmoreBtn"> + Add More </button>
        </div>
        <AmountDetails orders={orders} />
        <div className="OSsection">
          <div className="deliveryDetailsTitle">Delivery details</div>
          {hasAddress ? <AddressDetails /> : <AddressNotFound />}
        </div>
        <div className="OSsection">
          <div className="deliveryDetailsTitle">Instructions</div>
          <RequestInputSection />
        </div>
        <div className="ordersheetSubmitBtn">
          <Button
            name="Proceed to Payment"
            buttonType="bigButton"
            handleClick={handleSubmitClick}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSheetPage;
