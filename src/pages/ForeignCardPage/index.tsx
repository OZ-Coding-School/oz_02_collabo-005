import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/common/header/Header";
import InputItem from "@components/common/input/InputItem";
import "../KoreanCardPage/CardPage.css";
import Button from "@components/common/button/Button";

type foreignCardDataType = {
  cardNumber: string;
  expirationDateMonth: string;
  expirationDateYear: string;
  cardholderName: string;
  cvv: string;
  pinNumber: string;
};

const ForeignCardPage: React.FC = () => {
  const navigate = useNavigate();
  const initialCardData = {
    cardNumber: "",
    expirationDateMonth: "",
    expirationDateYear: "",
    cardholderName: "",
    cvv: "",
    pinNumber: "",
  };
  const [cardData, setCardData] =
    useState<foreignCardDataType>(initialCardData);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setCardData({
      ...cardData,
      [inputName]: inputValue,
    });
  };

  const handleSave = (): void => {
    navigate(-1);
  };

  return (
    <>
      <Header
        hasBackIcon={true}
        title="Register Card"
        hasCartIcon={false}
        handleBackIconClick={() => navigate(-1)}
      />
      <div className="cardMainContainer">
        <div className="cardButtonSection">
          <h2>Foreign credit card</h2>
          <Button
            name="Save"
            handleClick={handleSave}
            buttonType="smallButton"
          />
        </div>
        <form>
          <InputItem
            label="Card Number"
            name="cardNumber"
            type="text"
            value={cardData.cardNumber}
            place="Enter 16-digit card number"
            handleInputChange={handleInputChange}
          />
          Expiration Date <span style={{ color: "red" }}>*</span>
          <div className="expirationDateInputSection">
            <input
              type="text"
              name="expirationDateMonth"
              id="expirationDateMonth"
              value={cardData.expirationDateMonth}
              placeholder="MM"
              onChange={handleInputChange}
              maxLength={2}
            />
            <input
              type="text"
              name="expirationDateYear"
              id="expirationDateYear"
              value={cardData.expirationDateYear}
              placeholder="YY"
              onChange={handleInputChange}
              maxLength={2}
            />
          </div>
          <InputItem
            label="Cardholder Name"
            name="cardholderName"
            type="text"
            value={cardData.cardholderName}
            place=""
            handleInputChange={handleInputChange}
          />
          <InputItem
            label="CVV/CVC"
            name="cvv"
            type="text"
            value={cardData.cvv}
            place=""
            handleInputChange={handleInputChange}
          />
          <InputItem
            label="Pin number"
            name="pinNumber"
            type="text"
            value={cardData.pinNumber}
            place="Enter in the first two pins here"
            handleInputChange={handleInputChange}
          />
        </form>
      </div>
    </>
  );
};

export default ForeignCardPage;
