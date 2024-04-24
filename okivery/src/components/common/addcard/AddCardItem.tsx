import React, { useState } from "react";
import addCardImage from "../../../assets/images/AddCardImage.png";
import ProceedModal from "../modal/ProceedModal";
import { useNavigate } from "react-router-dom";

const AddCardItem: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <>
      <img
        src={addCardImage}
        onClick={openModal}
        alt="Add Card"
        style={{ cursor: "pointer" }}
      />
      {isModalOpen && (
        <ProceedModal
          onClose={closeModal}
          proceedQuestionText="Which type of card do you have?"
          leftButtonText="Korean card"
          rightButtonText="Foreign card"
          handleGoKoreanCard={handleGoKoreanCard}
          handleGoForeignCard={handleGoForeignCard}
        />
      )}
    </>
  );
};

export default AddCardItem;
