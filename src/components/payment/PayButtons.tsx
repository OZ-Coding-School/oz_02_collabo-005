import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { PayButtonType } from "../../pages/PaymentPage";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../home/banner/Banner.css";
import Button from "@components/common/button/Button";

interface PayButtonsProps {
  payButtons: PayButtonType[];
  handlePayNow: () => Promise<void>;
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
        freeMode={true}
        modules={[FreeMode]}
      >
        {payButtons.map((payButtons, index) => (
          <SwiperSlide key={index} className="bannerSwiperSlide">
            <Button
              name={payButtons.name}
              handleClick={handlePayNow}
              buttonType="bigButton"
              key={index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PayButtons;
