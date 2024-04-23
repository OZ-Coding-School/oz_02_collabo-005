import React from "react";
import "./ProceedModal.css";

interface ModalProps {
  onClose: () => void;
  proceedQuestionText: string;
  leftButtonText: string;
  rightButtonText: string;
  handleGoForeignCard?: () => void;
  handleGoKoreanCard?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  proceedQuestionText,
  leftButtonText,
  rightButtonText,
  handleGoKoreanCard,
  handleGoForeignCard,
}) => {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="closeButtonSection">
          <button className="closeButton" onClick={onClose}>
            x
          </button>
        </div>
        <div className="proceedQuestionSection">
          <span>{proceedQuestionText}</span>
        </div>

        <div className="twoButtonSection">
          <button className="koreanCardButton" onClick={handleGoKoreanCard}>
            {leftButtonText}
          </button>
          <button className="foreignCardButton" onClick={handleGoForeignCard}>
            {rightButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
