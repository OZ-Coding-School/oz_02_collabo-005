import React, { useState } from "react";
import ChangePasswordSection from "./ChangePasswordSection";
import InputFormItem from "../common/input/InputFormItem";
import BirthdayInputForm from "../common/input/BirthdayInputForm";

interface isEditProps {
  isEdit: boolean;
}

type UserDataType = {
  name: string;
  email: string;
  phone: number;
};

const UserInfoSection: React.FC<isEditProps> = ({ isEdit }) => {
  const initialUserData = {
    name: "",
    email: "",
    phone: 0,
  };
  const [userData, setUserData] = useState<UserDataType>(initialUserData);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setUserData({
      ...userData,
      [inputName]: inputValue,
    });
  };

  return (
    <div className="signUpContainer">
      <form>
        <InputFormItem
          label="Name"
          name="name"
          type="text"
          isMust={isEdit ? true : false}
          value={userData.name}
          place="name"
          isEdit={isEdit}
          handleInputChange={handleInputChange}
        />
        <InputFormItem
          label="E-Mail"
          name="email"
          type="email"
          isMust={isEdit ? true : false}
          value={userData.email}
          place="E-Mail"
          isEdit={isEdit}
          handleInputChange={handleInputChange}
        />
        <InputFormItem
          label="Phone Number"
          name="phone"
          type="number"
          isMust={isEdit ? true : false}
          value={userData.phone}
          place="Phone Number"
          isEdit={isEdit}
          handleInputChange={handleInputChange}
        />
        <BirthdayInputForm isEdit={isEdit} />
        {!isEdit ? null : <ChangePasswordSection isEdit={isEdit} />}
      </form>
    </div>
  );
};

export default UserInfoSection;
