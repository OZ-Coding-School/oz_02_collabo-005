import React from "react";
import InputFormItem from "../signup/InputFormItem";
import BirthdayInputForm from "../signup/BirthdayInputForm";
import ChangePasswordSection from "./ChangePasswordSection";

interface isEditProps {
  isEdit: boolean;
}

const UserInfoSection: React.FC<isEditProps> = ({ isEdit }) => {
  return (
    <div className="signUpContainer">
      <form>
        <InputFormItem label="Name" name="name" type="text" />
        <InputFormItem label="E-Mail" name="email" type="email" />
        <InputFormItem label="Phone Number" name="phone" type="number" />
        <BirthdayInputForm />
        {!isEdit ? null : <ChangePasswordSection />}
      </form>
    </div>
  );
};

export default UserInfoSection;
