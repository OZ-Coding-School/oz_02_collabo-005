import React, { useState } from "react";
import ChangePasswordSection from "./ChangePasswordSection";
import InputItem from "@components/common/input/InputItem";
import BirthdayInput from "@components/common/input/BirthdayInput";

interface isEditProps {
  isEdit: boolean;
}

type UserDataType = {
  name: string;
  email: string;
  phone: string;
};

const UserInfoSection: React.FC<isEditProps> = ({ isEdit }) => {
  const initialUserData = {
    name: "",
    email: "",
    phone: "",
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
        <InputItem
          label="Name"
          name="name"
          type="text"
          value={userData.name}
          place="name"
          isNoStar={true}
          readOnly={!isEdit ? true : false}
          handleInputChange={handleInputChange}
        />
        <InputItem
          label="E-Mail"
          name="email"
          type="email"
          value={userData.email}
          place="E-Mail"
          isNoStar={true}
          readOnly={!isEdit ? true : false}
          handleInputChange={handleInputChange}
        />
        <InputItem
          label="Phone Number"
          name="phone"
          type="number"
          value={userData.phone}
          place="Phone Number"
          isNoStar={true}
          readOnly={!isEdit ? true : false}
          handleInputChange={handleInputChange}
        />
        <BirthdayInput readOnly={!isEdit ? true : false} />
        {!isEdit ? null : <ChangePasswordSection />}
      </form>
    </div>
  );
};

export default UserInfoSection;
