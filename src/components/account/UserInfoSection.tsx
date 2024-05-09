import React, { useEffect } from "react";
import ChangePasswordSection from "./ChangePasswordSection";
import InputItem from "@components/common/input/InputItem";
import customAxios from "../../api/axios";
import apiRoutes from "../../api/apiRoutes";
import useLoginStore from "../../store/useStore";
import { UserDataType } from "../../pages/AccountPage";

interface isEditProps {
  isEdit: boolean;
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
}

const UserInfoSection: React.FC<isEditProps> = ({
  isEdit,
  userData,
  setUserData,
}) => {
  // 처음에 회원가입에서 입력했던 유저 정보(name, email, phone number) 보여주기
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
        });
        console.log(response.data);
      };
      getUserData();
    }
  }, []);

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
        {!isEdit ? null : (
          <ChangePasswordSection
            handleInputChange={handleInputChange}
            userData={userData}
          />
        )}
      </form>
    </div>
  );
};

export default UserInfoSection;
