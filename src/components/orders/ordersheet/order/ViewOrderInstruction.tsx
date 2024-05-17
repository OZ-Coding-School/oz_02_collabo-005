import React from "react";
import "./ViewOrderInstruction.css";
import InputItem from "@components/common/input/InputItem";

interface ViewOrderInstruction {
  noteRider: string | undefined;
  noteRes: string | undefined;
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
          <InputItem
            label="Notes for Restaurant"
            name="store_request"
            type="text"
            isNoStar={true}
            value={noteRes ? noteRes : "There are no requests."}
            readOnly={true}
          />
          <InputItem
            label="Notes for Rider"
            name="rider_request"
            type="text"
            isNoStar={true}
            readOnly={true}
            value={noteRider ? noteRider : "There are no requests."}
          />
        </div>
      </div>
    </>
  );
};

export default ViewOrderInstruction;
