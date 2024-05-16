import React from "react";

interface ViewOrderInstruction {
  noteRider: string;
  noteRes: string;
}

const ViewOrderInstruction: React.FC<ViewOrderInstruction> = ({
  noteRider,
  noteRes,
}) => {
  return (
    <>
      <div className="OSsection">
        <div className="deliveryDetailsTitle">Instructions</div>
        <div className="instructionsText">
          <div className="noteForRes">
            Notes for Restaurant
            <br />
            {noteRes}
          </div>
          <div className="noteForRider">
            Notes for Rider
            <br />
            {noteRider}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrderInstruction;
