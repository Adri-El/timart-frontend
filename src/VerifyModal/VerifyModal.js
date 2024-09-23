import React from "react";
import "./VerifyModal.css";
import { MdOutlineError } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

const VerifyModal = (props) => {
  return (
    <div>
      <div className="verify-modal" onClick={props.closeModalHandle}></div>
      <div className="verify-modal-content">
        <div className="verify-content">
          <div className="error-icon-box-con">
            <MdOutlineError className="verify-icon" />
          </div>
          <h2 className="verify-txt">Account Verification</h2>
          <div className="verify-line">
            <span>
              You are required to verify your Seller Account to start uploading
              your products and making sales on Entamarket.
            </span>
          </div>

          <div className="verify-link">
            <FaRegCheckCircle className="iconv" />
            <span>Government issued ID Card</span>
          </div>
          <div className="verify-link">
            <FaRegCheckCircle className="iconv" />
            <span>Shop Utility Bills Document</span>
          </div>

          <div className="verify-btn1">
            <button onClick={props.navigateToSellerVerify}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;
