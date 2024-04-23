import React from "react";
import "./FloatingLabelInput.css";

interface LoginInputProps {
  inputType: string;
  placeHolder: string;
  label: string;
  onInputChange: (value: string) => void;
}

const FloatingLabelInput: React.FC<LoginInputProps> = ({
  inputType,
  placeHolder,
  label,
  onInputChange,
}) => {
  // 입력값 변경 시 호출되는 콜백 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onInputChange(value);
  };

  return (
    <>
      <div className="formGroup">
        <input
          type={inputType}
          placeholder={placeHolder}
          onChange={handleInputChange}
        />
        <label className="formLabel">{label}</label>
      </div>
    </>
  );
};

export default FloatingLabelInput;
