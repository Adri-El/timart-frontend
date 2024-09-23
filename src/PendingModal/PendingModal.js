import React from "react";
import { MdOutlineError } from "react-icons/md";

const PendingModal = (props) => {
  return (
    <div>
      <div className="verify-modal" onClick={props.closePendingModal}></div>
      <div className="verify-modal-content">
        <div className="verify-content">
          <div className="error-icon-box-con-pend">
            <MdOutlineError className="verify-icon-pend" />
          </div>
          <h2 className="verify-txt">Pending Verification</h2>
          <div className="verify-line">
            <span>
              Please be patient with us, while we verify and get your account
              ready we promise that this won't be long
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingModal;
