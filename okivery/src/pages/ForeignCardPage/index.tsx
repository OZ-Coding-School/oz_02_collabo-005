import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header/Header";
import SmallButton from "../../components/common/button/SmallButton";
import InputFormItem from "../../components/common/input/InputFormItem";
import BirthdayInputForm from "../../components/common/input/BirthdayInputForm";
import "../KoreanCardPage/CardPage.css";

interface foreignCardDataType {
  cardNumber: string;
  expirationDateMonth: string;
  expirationDateYear: string;
  cardholderName: string;
  cvv: string;
  pinNumber: string;
  birthday: string;
}

const ForeignCardPage: React.FC = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<foreignCardDataType>({
    cardNumber: "",
    expirationDateMonth: "",
    expirationDateYear: "",
    cardholderName: "",
    cvv: "",
    pinNumber: "",
    birthday: "",
  });

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
      <div className="CardMainContainer">
        <div className="CardButtonSection">
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
    </>
  );
};

export default ForeignCardPage;
