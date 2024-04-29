import React from "react";
import "./AddressPage.css";
import Header from "@components/common/header/Header";
import selectMapIcon from "../../assets/icons/selectMapIcon.png";
import { Link } from "react-router-dom";

const AddressPage: React.FC = () => {
  return (
    <>
      <Header hasBackIcon={true} to="/home" title="" hasCartIcon={false} />
      <div className="addressMainContainer">
        <div className="addressSubContainer">
          <div className="setAddressTextSection">
            <h2>Set delivery address</h2>
          </div>
          <div className="setAddressContentSection">
            <div className="selectMapSection">
              <Link to="/address/select-map">
                <button>
                  <img
                    src={selectMapIcon}
                    style={{ width: "16px", height: "16px" }}
                  />
                  Find your location on the map
                </button>
              </Link>
              <div className="selectAddressTextInput">
                <label htmlFor="selectAddress" />
                <input
                  type="text"
                  name="selectAddress"
                  id="selectAddress"
                  value=""
                  placeholder="Type in your address"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
