import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header/Header";
import InputItem from "../../components/common/input/InputItem";
import BirthdayInput from "../../components/common/input/BirthdayInput";
import "../KoreanCardPage/CardPage.css";
import Button from "../../components/common/button/Button";

type foreignCardDataType = {
  cardNumber: string;
  expirationDateMonth: string;
  expirationDateYear: string;
  cardholderName: string;
  cvv: string;
  pinNumber: string;
  birthday: string;
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
    birthday: "",
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
      <Header hasBackIcon={true} title="Register Card" hasCartIcon={false} />
      <div className="cardMainContainer">
<<<<<<< HEAD
        <div className="cardSubContainer">
          <div className="cardButtonSection">
            <h2>Foreign credit card</h2>
            <SmallButton name="Save" handleClick={handleSave} />
          </div>
          <form>
            <InputItem
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
            <InputItem
              label="Cardholder Name"
              name="cardholderName"
              type="text"
              isMust={true}
              value={cardData.cardholderName}
              isEdit={true}
              place=""
              handleInputChange={handleInputChange}
            />
            <InputItem
              label="CVV/CVC"
              name="cvv"
              type="number"
              isMust={true}
              value={cardData.cvv}
              isEdit={true}
              place=""
              handleInputChange={handleInputChange}
            />
            <InputItem
              label="Pin number"
              name="pinNumber"
              type="number"
              isMust={true}
              value={cardData.pinNumber}
              isEdit={true}
              place="Enter in the first two pins here"
              handleInputChange={handleInputChange}
            />
            <BirthdayInput isEdit={true} isMust={true} />
          </form>
=======
        <div className="cardButtonSection">
          <h2>Foreign credit card</h2>
          <Button
            name="Save"
            handleClick={handleSave}
            buttonType="smallButton"
          />
>>>>>>> 9057d0b31e4e285743c809e3e75c39f8cffe5fca
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
          <BirthdayInput isMust={true} />
        </form>
      </div>
    </>
  );
};

export default ForeignCardPage;
