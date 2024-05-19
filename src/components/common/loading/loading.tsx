import React from "react";
import { SyncLoader } from "react-spinners";
import "./loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loadingContainer">
      <SyncLoader color="#ff6347" speedMultiplier={0.8} />
    </div>
  );
};

export default Loading;
