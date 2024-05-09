import React, { useEffect, useState } from "react";
import ChangePasswordSection from "./ChangePasswordSection";
import InputItem from "@components/common/input/InputItem";
import customAxios from "../../api/axios";
import apiRoutes from "../../api/apiRoutes";
import useLoginStore from "../../store/useStore";

interface isEditProps {
  isEdit: boolean;
}

type UserDataType = {
  name: string;
  email: string;
  phone: string;
  // password: string;
};

const UserInfoSection: React.FC<isEditProps> = ({ isEdit }) => {
  useEffect(() => {
    const loginToken = useLoginStore.getState().loginToken;
    if (loginToken !== null) {
      const getUserData = async () => {
        const response = await customAxios.get(apiRoutes.user);
        setUserData({
          ...userData,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone_number,
          // password: response.data.password,
        });
        console.log(response.data);
      };
      getUserData();
    }
  }, []);

  const initialUserData = {
    name: "",
    email: "",
    phone: "",
    // password: "",
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
        {/* <BirthdayInput readOnly={!isEdit ? true : false} /> */}
        {!isEdit ? null : <ChangePasswordSection />}
      </form>
    </div>
  );
};

export default UserInfoSection;
