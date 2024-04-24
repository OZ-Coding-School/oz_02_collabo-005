import React from "react";
import ChangePasswordSection from "./ChangePasswordSection";
import InputFormItem from "../common/input/InputFormItem";
import BirthdayInputForm from "../common/input/BirthdayInputForm";

interface isEditProps {
  isEdit: boolean;
}

const UserInfoSection: React.FC<isEditProps> = ({ isEdit }) => {
  return (
    <div className="signUpContainer">
      <form>
        <InputFormItem
          label="Name"
          name="name"
          type="text"
          isMust={isEdit ? true : false}
          value=""
          place="name"
          isEdit={isEdit}
        />
        <InputFormItem
          label="E-Mail"
          name="email"
          type="email"
          isMust={isEdit ? true : false}
          value=""
          place="E-Mail"
          isEdit={isEdit}
        />
        <InputFormItem
          label="Phone Number"
          name="phone"
          type="number"
          isMust={isEdit ? true : false}
          value=""
          place="Phone Number"
          isEdit={isEdit}
        />
        <BirthdayInputForm isEdit={isEdit} />
        {!isEdit ? null : <ChangePasswordSection isEdit={isEdit} />}
      </form>
    </div>
  );
};

export default UserInfoSection;
