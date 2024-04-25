import React, { useState } from "react";
import Header from "../../components/common/header/Header";
import SmallButton from "../../components/common/button/SmallButton";
import { useNavigate } from "react-router-dom";
import InputFormItem from "../../components/common/input/InputFormItem";
import BirthdayInputForm from "../../components/common/input/BirthdayInputForm";
import "./CardPage.css";

type koreanCardDataType = {
  cardNumber: number;
  expirationDateMonth: number;
  expirationDateYear: number;
  cardholderName: string;
  cvv: number;
  pinNumber: number;
  birthday: number;
};

const KoreanCardPage: React.FC = () => {
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
  const [cardData, setCardData] = useState<koreanCardDataType>(initialCardData);

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
        to="/account"
        title="Register Card"
        hasCartIcon={false}
      />
      <div className="cardMainContainer">
        <div className="cardSubContainer">
          <div className="cardButtonSection">
            <h2>Korean credit card</h2>
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
              <label htmlFor="expirationDateMonth"></label>
              <input
                type="number"
                name="expirationDateMonth"
                id="expirationDateMonth"
                value={cardData.expirationDateMonth}
                placeholder="MM"
                onChange={handleInputChange}
              />
              <label htmlFor="expirationDateYear"></label>
              <input
                type="number"
                name="expirationDateYear"
                id="expirationDateYear"
                value={cardData.expirationDateYear}
                placeholder="YY"
                onChange={handleInputChange}
              />
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

export default KoreanCardPage;
