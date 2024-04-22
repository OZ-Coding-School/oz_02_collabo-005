import React from "react";
import "../../styles/login/component/LoginInput.css";

interface LoginInputProps {
  inputType: string;
  placeHolder: string;
  text: string;
  onInputChange: (value: string) => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
  inputType,
  placeHolder,
  text,
  onInputChange,
}) => {
  // 입력값 변경 시 호출되는 콜백 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onInputChange(value);
  };

  return (
    <>
      <div className="form-group">
        <input
          type={inputType}
          placeholder={placeHolder}
          onChange={handleInputChange}
        />
        <label className="form-label">{text}</label>
      </div>
    </>
  );
};

export default LoginInput;
