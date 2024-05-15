import React from "react";

const ViewOrderInstruction: React.FC = () => {
  return (
    <>
      <div className="OSsection">
        <div className="deliveryDetailsTitle">Instructions</div>
        <div className="instructionsText">
          <div className="noteForRes">
            Notes for Restaurant
            <br />
            수저세트 안주셔도 됩니다.
          </div>
          <div className="noteForRider">
            Notes for Rider
            <br />
            문앞에 두고 가주세요.
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrderInstruction;
