import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header/Header";
import SmallButton from "../../components/common/button/SmallButton";
import InputFormItem from "../../components/common/input/InputItem";
import BirthdayInputForm from "../../components/common/input/BirthdayInput";
import "../KoreanCardPage/CardPage.css";

type foreignCardDataType = {
  cardNumber: number;
  expirationDateMonth: number;
  expirationDateYear: number;
  cardholderName: string;
  cvv: number;
  pinNumber: number;
  birthday: number;
};

const ForeignCardPage: React.FC = () => {
  const navigate = useNavigate();
  const initialCardData = {
    cardNumber: 0,
    expirationDateMonth: 0,
    expirationDateYear: 0,
    cardholderName: "",
    cvv: 0,
    pinNumber: 0,
    birthday: 0,
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

  // Expiration Date의 입력 값이 최대 길이인 2보다 긴 경우 자르기
  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = event.target.value;
    if (inputValue.length > 2) {
      event.target.value = inputValue.slice(0, 2);
    }
  };

  const handleSave = (): void => {
    navigate(-1);
  };

  return (
    <>
      <Header
        hasBackIcon={true}
        to="/account"
        title="Register Card"
        hasCartIcon={false}
      />
      <div className="cardMainContainer">
        <div className="cardSubContainer">
          <div className="cardButtonSection">
            <h2>Foreign credit card</h2>
            <SmallButton name="Save" handleClick={handleSave} />
          </div>
          <form>
            <InputFormItem
              label="Card Number"
              name="cardNumber"
              type="number"
              isMust={true}
              value={cardData.cardNumber}
              isEdit={true}
              place="Enter 16-digit card number"
              handleInputChange={handleInputChange}
            />
            Expiration Date <span style={{ color: "red" }}>*</span>
            <div className="expirationDateInputSection">
              <label htmlFor="expirationDateMonth">
                <input
                  type="number"
                  name="expirationDateMonth"
                  id="expirationDateMonth"
                  value={cardData.expirationDateMonth}
                  placeholder="MM"
                  onChange={handleInputChange}
                  onInput={handleOnInput}
                />
              </label>
              <label htmlFor="expirationDateYear">
                <input
                  type="number"
                  name="expirationDateYear"
                  id="expirationDateYear"
                  value={cardData.expirationDateYear}
                  placeholder="YY"
                  onChange={handleInputChange}
                  onInput={handleOnInput}
                />
              </label>
            </div>
            <InputFormItem
              label="Cardholder Name"
              name="cardholderName"
              type="text"
              isMust={true}
              value={cardData.cardholderName}
              isEdit={true}
              place=""
              handleInputChange={handleInputChange}
            />
            <InputFormItem
              label="CVV/CVC"
              name="cvv"
              type="number"
              isMust={true}
              value={cardData.cvv}
              isEdit={true}
              place=""
              handleInputChange={handleInputChange}
            />
            <InputFormItem
              label="Pin number"
              name="pinNumber"
              type="number"
              isMust={true}
              value={cardData.pinNumber}
              isEdit={true}
              place="Enter in the first two pins here"
              handleInputChange={handleInputChange}
            />
            <BirthdayInputForm isEdit={true} isMust={true} />
          </form>
        </div>
      </div>
    </>
  );
};

export default ForeignCardPage;
