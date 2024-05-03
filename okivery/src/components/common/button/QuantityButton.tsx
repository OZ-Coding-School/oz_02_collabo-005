import React from "react";
import "./QuantityButton.css";

interface QuantityButtonProps {
  quantity: number;
  handlePlusBtnClick: () => void;
  handleMinusBtnClick: () => void;
  disabled?: boolean;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  quantity,
  handlePlusBtnClick,
  handleMinusBtnClick,
  disabled,
}) => {
  return (
    <div className="quantityButtonContainer">
      <button
        className="minus Btns"
        onClick={handleMinusBtnClick}
        disabled={disabled}
      >
        -
      </button>
      <div className="menuQuantity"> {quantity} </div>
      <button
        className="plus Btns"
        onClick={handlePlusBtnClick}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
