import React, { useState } from "react";
import Header from "../../components/common/header/Header";
import "./AccountPage.css";
import SmallButton from "../../components/common/button/SmallButton";
import UserInfoSection from "../../components/account/UserInfoSection";
import CardManagementSection from "../../components/common/addcard/CardManagementSection";
import { useNavigate } from "react-router-dom";

const AccountPage: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // edit이나 save버튼을 눌렀을때 호출되는 함수
  const handleEditChange = (): void => {
    setIsEdit(!isEdit);
  };
  const navigate = useNavigate();

  // 로그아웃 버튼을 눌렀을 때 호출되는 함수
  const handleLogOut = (): void => {
    // 로그아웃 로직 미구현
    navigate("/");
  };

  // 계정삭제 버튼을 눌렀을 때 호출되는 함수
  const handleDeleteAccount = (): void => {
    // 계정삭제 로직 미구현
    navigate("/");
  };

  return (
    <>
      <Header hasBackIcon={false} to="" title="Account" hasCartIcon={false} />
      <div className="accountMainContainer">
        <div className="editButtonSection">
          <SmallButton
            name={isEdit ? "Save" : "Edit"}
            handleEditChange={handleEditChange}
          />
        </div>
        <UserInfoSection isEdit={isEdit} />
        <div className="cardManagementSection">
          <CardManagementSection />
        </div>
        <div className="signOutSection">
          <SmallButton name="Log Out" handleEditChange={handleLogOut} />
          <SmallButton
            name="Delete Account"
            handleEditChange={handleDeleteAccount}
          />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
