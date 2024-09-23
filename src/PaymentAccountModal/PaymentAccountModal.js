import "./PaymentAccountModal.css";
import { MdAccountBalance } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

const PaymentAccountModal = (props) => {
  return (
    <div className="modal-content">
      <div className="modal-close">
        <FaTimes className="close" onClick={props.closeModal} />
      </div>

      <div className="pay_account-icon">
        <span>
          <MdAccountBalance />
        </span>
        <h4>Add Payment Account</h4>
      </div>

      {props.children}
    </div>
  );
};

export default PaymentAccountModal;
