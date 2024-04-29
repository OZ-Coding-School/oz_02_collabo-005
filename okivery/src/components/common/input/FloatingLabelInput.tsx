import React from "react";
import "./FloatingLabelInput.css";

interface LoginInputProps {
  inputType: string;
  placeHolder: string;
  label: string;
  name: string;
  value: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingLabelInput: React.FC<LoginInputProps> = ({
  inputType,
  placeHolder,
  label,
  name,
  value,
  handleInputChange,
}) => {
  return (
    <>
      <div className="formGroup">
        <input
          type={inputType}
          placeholder={placeHolder}
          onChange={handleInputChange}
          name={name}
          id={name}
          value={value}
        />
        <label className="formLabel">{label}</label>
      </div>
    </>
  );
};

export default FloatingLabelInput;
