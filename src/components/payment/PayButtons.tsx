import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { PayButtonType } from "../../pages/PaymentPage";

import "./PayButtons.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Button from "@components/common/button/Button";

interface PayButtonsProps {
  payButtons: PayButtonType[];
  handlePayNow: (buttonName: string) => Promise<void>;
}

const PayButtons: React.FC<PayButtonsProps> = ({
  payButtons,
  handlePayNow,
}) => {
  return (
    <div className="bannerRow">
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        loop={false}
        pagination={true}
        freeMode={true}
        modules={[FreeMode]}
      >
        {payButtons.map((payButtons, index) => (
          <SwiperSlide key={index} className="paySwiperSlide">
            <div className="payButtonBox">
              <Button
                name={payButtons.name}
                handleClick={() => handlePayNow(payButtons.name)}
                buttonType="bigButton"
                key={index}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PayButtons;
