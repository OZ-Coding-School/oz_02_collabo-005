import InputItem from "@components/common/input/InputItem";
import React from "react";

interface RequestInputSection {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RequestInputSection: React.FC<RequestInputSection> = ({
  handleInputChange,
}) => {
  return (
    <div>
      <InputItem
        label="Notes for Restaurant"
        name="store_request"
        type="text"
        isNoStar={true}
        handleInputChange={handleInputChange}
      />
      <InputItem
        label="Notes for Rider"
        name="rider_request"
        type="text"
        isNoStar={true}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default RequestInputSection;
