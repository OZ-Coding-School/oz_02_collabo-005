import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcSimCardChip } from "react-icons/fc";
import { TiPlus } from "react-icons/ti";
import ProceedModal from "@components/common/modal/ProceedModal";

const AddCards: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <div
        className={"paymentItem addCardItem"}
        onClick={() => openModal()}
        id="addCards"
      >
        <FcSimCardChip className="simCard" />
        <div className="addCardPlus">
          <TiPlus />
        </div>
      </div>
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

export default AddCards;
