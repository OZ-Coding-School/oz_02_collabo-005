import React from "react";
import InputItem from "@components/common/input/InputItem";
import "./ChangePasswordSection.css";
import { RiInformation2Line } from "react-icons/ri";
import { UserDataType } from "../../pages/AccountPage";

interface ChangePasswordSectionProps {
  userData: UserDataType;
  handleInputChange: (field: string, value: string) => void;
}

const ChangePasswordSection: React.FC<ChangePasswordSectionProps> = ({
  handleInputChange,
  userData,
}) => {
  return (
    <div>
      <div className="currentPasswordSection">
        <div className="changePasswordText">
          <RiInformation2Line color="red" size={10} />
          &nbsp;To change your password, please enter your current password.
        </div>
        <InputItem
          label="Current Password"
          name="currentPassword"
          type="password"
          value={userData.currentPassword.value}
          className={userData.currentPassword.error ? "error" : ""}
          errorMessage={userData.currentPassword.error}
          handleInputChange={(e) => {
            handleInputChange("currentPassword", e.target.value);
          }}
          isNoStar={true}
          place="Type Current Password"
        />
      </div>
      <InputItem
        label="Confirm new Password"
        name="newPassword"
        type="password"
        value={userData.newPassword.value}
        className={userData.newPassword.error ? "error" : ""}
        errorMessage={userData.newPassword.error}
        handleInputChange={(e) => {
          handleInputChange("newPassword", e.target.value);
        }}
        isNoStar={true}
        place="Type New Password"
      />
    </div>
  );
};

export default ChangePasswordSection;
