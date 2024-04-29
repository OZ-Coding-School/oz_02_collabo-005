import React, { useState } from "react";
import Button from "@components/common/button/Button";
import InputItem from "@components/common/input/InputItem";

type UserPassword = {
  currentPassword: string;
  newPassword: string;
};

const ChangePasswordSection: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const initialUserPassword = {
    currentPassword: "",
    newPassword: "",
  };
  const [userPassword, setUserPassword] =
    useState<UserPassword>(initialUserPassword);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setUserPassword({
      ...userPassword,
      [inputName]: inputValue,
    });
  };

  // 사용자 입력 비밀번호화 현재 디비에 저장되어 있는 비밀번호가 같은지 검사 후 새로운 비밀번호 입력할 수 있도록 하는 함수
  const handleVerify = (): void => {
    const isPasswordEqual: boolean =
      userPassword.currentPassword === "디비에 저장된 비밀번호";
    if (isPasswordEqual) {
      // 현재 비밀번호와 디비에 저장되어있는 비밀번호가 같으면 new password input을 수정 가능 상태로 변경
      setIsVerified(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  // 사용자가 입력한 값에 따라 input 내용이 바뀌고 userPassword에 저장하는 함수
  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ): void => {
  //   event.preventDefault();

  //   const inputName = event.target.name;
  //   const inputData = event.target.value;
  //   setUserPassword({
  //     ...userPassword,
  //     [inputName]: inputData,
  //   });
  // };

  return (
    <div className="changePasswordSection">
      <div className="currentPasswordSection">
        <InputItem
          label="Current Password"
          name="currentPassword"
          type="password"
          value={userPassword.currentPassword}
          place="Current Password"
          handleInputChange={handleInputChange}
          isNoStar={true}
        />
        <div className="verifyButtonSection">
          <Button
            name="verify"
            handleClick={handleVerify}
            buttonType="smallButton"
          />
        </div>
      </div>
      <InputItem
        label="Confirm new Password"
        name="newPassword"
        type="password"
        value={userPassword.newPassword}
        place="new Password"
        handleInputChange={handleInputChange}
        isNoStar={true}
        readOnly={true}
      />
    </div>
  );
};

export default ChangePasswordSection;
