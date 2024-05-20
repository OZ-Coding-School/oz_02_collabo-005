import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { OrderDataType } from "src/types/ordersType";
import { IoCardOutline } from "react-icons/io5";
import { LiaMoneyBillAlt } from "react-icons/lia";
import "./PaymentItem.css";
import AddCards from "@components/common/payment/AddCards";

interface PaymentItemProps {
  payOrderData: OrderDataType;
  setPayOrderData: React.Dispatch<React.SetStateAction<OrderDataType>>;
}

const PaymentItem: React.FC<PaymentItemProps> = ({
  payOrderData,
  setPayOrderData,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handlePaymentItemClick = (itemId: string): void => {
    setSelectedItemId(itemId); // 클릭된 요소의 ID를 저장
    let newPaymentMethod;
    if (itemId === "offlineCard") {
      newPaymentMethod = 310201;
    } else if (itemId === "offlineCash") {
      newPaymentMethod = 310202;
    } else {
      newPaymentMethod = 0;
    }

    console.log(itemId);

    const updatedData = {
      ...payOrderData,
      payment_method: newPaymentMethod,
    };

    setPayOrderData(updatedData);
  };

  return (
    <>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide className="paySwiperSlide">
          <div
            className={`paymentItem ${
              selectedItemId === "offlineCard" ? "selectedPayment" : ""
            }`}
            onClick={() => handlePaymentItemClick("offlineCard")}
            id="offlineCard"
          >
            <IoCardOutline /> offline card payment
          </div>
        </SwiperSlide>
        <SwiperSlide className="paySwiperSlide">
          <div
            className={`paymentItem ${
              selectedItemId === "offlineCash" ? "selectedPayment" : ""
            }`}
            onClick={() => handlePaymentItemClick("offlineCash")}
            id="offlineCash"
          >
            <LiaMoneyBillAlt />
            offline cash payment
          </div>
        </SwiperSlide>
        <SwiperSlide className="paySwiperSlide">
          <AddCards />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default PaymentItem;
