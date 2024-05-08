import React from "react";
import "./ProceedModal.css";

interface ModalProps {
  onClose: () => void;
  proceedQuestionText: string;
  leftButtonText: string;
  rightButtonText: string;
  handleRightClick?: () => void;
  handleLeftClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  proceedQuestionText,
  leftButtonText,
  rightButtonText,
  handleLeftClick,
  handleRightClick,
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
          <button className="leftButton" onClick={handleLeftClick}>
            {leftButtonText}
          </button>
          <button className="rightButton" onClick={handleRightClick}>
            {rightButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
