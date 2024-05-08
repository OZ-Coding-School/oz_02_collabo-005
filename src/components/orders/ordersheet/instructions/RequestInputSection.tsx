import InputItem from "@components/common/input/InputItem";
import React from "react";

const RequestInputSection: React.FC = () => {
  return (
    <div>
      <InputItem
        label="Notes for Restaurant"
        name="restaurantRequest"
        type="text"
        isNoStar={true}
      />
      <InputItem
        label="Notes for Rider"
        name="riderRequest"
        type="text"
        isNoStar={true}
      />
    </div>
  );
};

export default RequestInputSection;
