import React from "react";
import InputItem from "@components/common/input/InputItem";
import "./ChangePasswordSection.css";
import { RiInformation2Line } from "react-icons/ri";
import { UserDataType } from "../../pages/AccountPage";

interface ChangePasswordSectionProps {
  userData: UserDataType;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChangePasswordSection: React.FC<ChangePasswordSectionProps> = ({
  handleInputChange,
  userData,
}) => {
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
          value={userData.currentPassword}
          handleInputChange={handleInputChange}
          isNoStar={true}
          place="Current Password"
        />
      </div>
      <InputItem
        label="Confirm new Password"
        name="newPassword"
        type="password"
        value={userData.newPassword}
        handleInputChange={handleInputChange}
        isNoStar={true}
        place="New Password"
      />
    </div>
  );
};

export default ChangePasswordSection;
