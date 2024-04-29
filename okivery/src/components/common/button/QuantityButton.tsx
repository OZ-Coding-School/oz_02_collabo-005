import React from "react";
import "./QuantityButton.css";

interface QuantityButtonProps {
  quantity: number;
  handlePlusBtnClick: () => void;
  handleMinusBtnClick: () => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  quantity,
  handlePlusBtnClick,
  handleMinusBtnClick,
}) => {
  return (
    <div className="quantityButtonContainer">
      <button className="minus Btns" onClick={handleMinusBtnClick}>
        -
      </button>
      <div className="menuQuantity"> {quantity} </div>
      <button className="plus Btns" onClick={handlePlusBtnClick}>
        +
      </button>
    </div>
  );
};

export default QuantityButton;
