import React, { useState } from "react";
import InputItem from "@components/common/input/InputItem";
import "./ChangePasswordSection.css";
import { RiInformation2Line } from "react-icons/ri";

type UserPassword = {
  currentPassword: string;
  newPassword: string;
};

const ChangePasswordSection: React.FC = () => {
  false;
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

  return (
    <div className="changePasswordSection">
      <div className="currentPasswordSection">
        <div className="changePasswordText">
          <RiInformation2Line color="red" size={10} />
          &nbsp;To change your password, please enter your current password.
        </div>
        <InputItem
          label="Current Password"
          name="currentPassword"
          type="password"
          value={userPassword.currentPassword}
          handleInputChange={handleInputChange}
          isNoStar={true}
          place="Current Password"
        />
      </div>
      <InputItem
        label="Confirm new Password"
        name="newPassword"
        type="password"
        value={userPassword.newPassword}
        handleInputChange={handleInputChange}
        isNoStar={true}
        place="New Password"
      />
    </div>
  );
};

export default ChangePasswordSection;
