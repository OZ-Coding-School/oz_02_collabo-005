import React, { useState } from "react";
import ProceedModal from "../modal/ProceedModal";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { OrderDataType } from "src/types/ordersType";
import { IoCardOutline } from "react-icons/io5";
import { LiaMoneyBillAlt } from "react-icons/lia";
import { FcSimCardChip } from "react-icons/fc";
import "./PaymentItem.css";

interface PaymentItemProps {
  payOrderData: OrderDataType;
  setPayOrderData: React.Dispatch<React.SetStateAction<OrderDataType>>;
}

const PaymentItem: React.FC<PaymentItemProps> = ({
  payOrderData,
  setPayOrderData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const navigate = useNavigate();

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  // 모달창에서 korean card 버튼을 눌렀을 때 동작하는 함수
  const handleGoKoreanCard = (): void => {
    navigate("/account/koreanCard");
  };

  // 모달창에서 foreign card 버튼을 눌렀을 때 동작하는 함수
  const handleGoForeignCard = (): void => {
    navigate("/account/foreignCard");
  };

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
          <div
            className={"paymentItem addCardItem"}
            onClick={() => openModal()}
            id="addCards"
          >
            <FcSimCardChip className="simCard" />
            <div className="addCardPlus">+</div>
          </div>
        </SwiperSlide>
      </Swiper>

      {isModalOpen && (
        <ProceedModal
          onClose={closeModal}
          proceedQuestionText="Which type of card do you have?"
          leftButtonText="Korean card"
          rightButtonText="Foreign card"
          handleLeftClick={handleGoKoreanCard}
          handleRightClick={handleGoForeignCard}
        />
      )}
    </>
  );
};

export default PaymentItem;
